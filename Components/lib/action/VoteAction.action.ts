"use server";

import { auth } from "@/auth";
import dbConnect from "../dbconnect";
import { actionError } from "../response";
import VoteActionSchema from "../schema/VoteActionSchema";
import validatebody from "../validateBodyTemp";
import mongoose from "mongoose";
import Question from "@/database/question.model";
import Answer from "@/database/answer.model";
import Vote from "@/database/vote.model";
import User from "@/database/user.model";

export async function VoteAction(params: {
  typeId: string;
  type: "question" | "answer";
  voteType: "upvote" | "downvote";
}): Promise<{
  success: boolean;
  data?: {
    upvotes: number;
    downvotes: number;
    userVote: "upvote" | "downvote" | null;
  };
  message?: string;
  details?: object | null;
}> {
  await dbConnect();

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const validatedData = validatebody(params, VoteActionSchema);
    const { typeId, type, voteType } = validatedData;
    const authSession = await auth();

    if (!authSession?.user?.email) {
      throw new Error("Unauthorized");
    }

    const user = await User.findOne({
      email: authSession.user.email,
    }).session(session);

    if (!user) {
      throw new Error("User not found");
    }

    const userId = user._id;

    const Model = type === "question" ? Question : Answer;
    const item = await Model.findById(typeId).session(session);

    if (!item) {
      throw new Error("Item not found");
    }

    const existingVote = await Vote.findOne({
      author: userId,
      type_id: typeId,
      type,
    }).session(session);

    let newUpvotes = item.upvotes || 0;
    let newDownvotes = item.downvotes || 0;
    let userVote: "upvote" | "downvote" | null = null;

    if (existingVote) {
      if (existingVote.votetype === voteType) {
        if (voteType === "upvote") {
          newUpvotes = Math.max(0, newUpvotes - 1);
        } else {
          newDownvotes = Math.max(0, newDownvotes - 1);
        }
        await Vote.findByIdAndDelete(existingVote._id).session(session);
        userVote = null;
      } else {
        if (existingVote.votetype === "upvote") {
          newUpvotes = Math.max(0, newUpvotes - 1);
          newDownvotes += 1;
        } else {
          newDownvotes = Math.max(0, newDownvotes - 1);
          newUpvotes += 1;
        }
        existingVote.votetype = voteType;
        await existingVote.save({ session });
        userVote = voteType;
      }
    } else {
      await Vote.create(
        [
          {
            author: userId,
            type_id: typeId,
            type,
            votetype: voteType,
          },
        ],
        { session }
      );

      if (voteType === "upvote") {
        newUpvotes += 1;
      } else {
        newDownvotes += 1;
      }
      userVote = voteType;
    }

    item.upvotes = newUpvotes;
    item.downvotes = newDownvotes;
    await item.save({ session });

    await session.commitTransaction();

    return {
      success: true,
      data: {
        upvotes: newUpvotes,
        downvotes: newDownvotes,
        userVote,
      },
    };
  } catch (e) {
    await session.abortTransaction();
    return actionError(e);
  } finally {
    await session.endSession();
  }
}
