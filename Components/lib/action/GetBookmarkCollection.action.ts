"use server";

import mongoose, { PipelineStage } from "mongoose";
import Collection, { Icollection } from "@/database/collection.model";
import dbConnect from "../dbconnect";
import { auth } from "@/auth";
import User from "@/database/user.model";
import validatebody from "../validateBodyTemp";
import PaginatedSearchParamsSchema from "../schema/PaginatedSearchParamsSchema";
import { actionError } from "../response";

export async function GetBookmarkCollection(params: {
  page?: number;
  pageSize?: number;
  sort?: string;
  search?: string;
  filter?: string;
}): Promise<{
  success: boolean;
  data?: {
    collection: Icollection[];
    isNext: boolean;
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
    throw new Error("User not found.");
  }

  const userId = user._id;

  if (!userId) {
    return {
      success: true,
      data: {
        collection: [],
        isNext: false,
      },
    };
  }

  const validatedData = validatebody(params, PaginatedSearchParamsSchema);
  const { page = 1, pageSize = 10, search, sort, filter } = validatedData;

  const skip = (Number(page) - 1) * 10;
  const limit = Number(pageSize);

  const sortOption: Record<string, Record<string, 1 | -1>> = {
    oldest: { "question.createdAt": 1 },
    mostvoted: { "question.upvotes": -1 },
    mostviewed: { "question.views": -1 },
    mostrecent: { "question.createdAt": -1 },
    mostanswered: { "question.answers": -1 },
  };

  const sortOptionResult = sortOption[filter] || sortOption.mostrecent;

  try {
    const pipeline: PipelineStage[] = [
      {
        $match: { author: new mongoose.Types.ObjectId(userId) },
      },

      {
        $lookup: {
          from: "questions",
          localField: "question",
          foreignField: "_id",
          as: "question",
        },
      },
      { $unwind: "$question" },

      {
        $lookup: {
          from: "users",
          localField: "question.author",
          foreignField: "_id",
          as: "question.author",
        },
      },
      { $unwind: "$question.author" },

      {
        $lookup: {
          from: "tags",
          localField: "question.tags",
          foreignField: "_id",
          as: "question.tags",
        },
      },
    ];

    if (search) {
      pipeline.push({
        $match: {
          $or: [
            { "question.title": { $regex: new RegExp(search, "i") } },
            { "question.content": { $regex: new RegExp(search, "i") } },
          ],
        },
      });
    }

    const [totalCountResult] = await Collection.aggregate([
      ...pipeline,
      { $count: "count" },
    ]);

    const totalCollection = totalCountResult.count || 0;

    const collections = await Collection.aggregate([
      ...pipeline,
      { $skip: skip },
      { $limit: limit },
      { $sort: sortOptionResult },
    ]);

    const isNext = totalCollection > skip + collections.length;

    return {
      success: true,
      data: {
        collection: JSON.parse(JSON.stringify(collections)),
        isNext,
      },
    };
  } catch (e) {
    return actionError(e);
  }
}
