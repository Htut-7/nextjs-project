"use server";

import { auth } from "@/auth";
import dbConnect from "../dbconnect";
import GetUserVoteSchema from "../schema/GetUserVoteSchema";
import validatebody from "../validateBodyTemp";
import User from "@/database/user.model";
import { actionError } from "../response";
import Vote from "@/database/vote.model";

export async function GetUserVote(params: {
  type: "answer" | "question";
  typeId: string;
}): Promise<{
  success: boolean;
  data?: {
    userVote: "upvote" | "downvote" | null;
  };
  message?: string;
  details?: object | null;
}> {
  await dbConnect();
  const authSession = await auth();
  if (!authSession?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await User.findOne({
    email: authSession.user.email,
  });

  if (!user) {
    throw new Error("User not found");
  }

  try {
    const validatedData = validatebody(params, GetUserVoteSchema);
    const { type, typeId } = validatedData;

    const vote = await Vote.findOne({
      author: user._id,
      type_id: typeId,
      type,
    });

    return {
      success: true,
      data: {
        userVote: vote?.votetype || null,
      },
    };
  } catch (e) {
    return actionError(e);
  }
}
