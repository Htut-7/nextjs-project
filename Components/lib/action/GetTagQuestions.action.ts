"use server";

import dbConnect from "../dbconnect";
import validatebody from "../validateBodyTemp";
import GetTagQuestionsSchema from "../schema/GetTagQuestionsSchema";
import { FilterQuery } from "mongoose";
import Question, { IquestionDoc } from "@/database/question.model";
import { actionError } from "../response";
import Tags, { ItagDoc } from "@/database/tags.model";

const GetTagQuestions = async (params: {
  page?: number;
  pageSize?: number;
  search?: string;
  sort?: string;
  tagId: string;
}): Promise<{
  success: Boolean;
  data?: {
    tag: ItagDoc;
    questions: IquestionDoc[];
    isNext: Boolean;
  };
  message?: string | undefined;
  detail?: object | null;
}> => {
  await dbConnect();
  const validatedData = validatebody(params, GetTagQuestionsSchema);
  const { page = 1, pageSize = 10, search, tagId } = validatedData;

  const skip = (Number(page) - 1) * pageSize;
  const limit = Number(pageSize);

  try {
    const tag = await Tags.findById(tagId);
    if (!tag) throw new Error("Tag not found.");

    const filterQuery: FilterQuery<typeof Question> = {
      tags: { $in: [tagId] },
    };

    if (search) {
      filterQuery.title = { $regex: new RegExp(search, "i") };
    }

    const totalQuestions = await Question.countDocuments(filterQuery);
    const queustion = await Question.find(filterQuery)
      .select("_id title views answers upvotes downvotes author createdAt")
      .populate("author", "name image")
      .populate("tags", "name")
      .lean()
      .skip(skip)
      .limit(limit);
    const isNext = totalQuestions > skip + queustion.length;

    return {
      success: true,
      data: {
        tag: JSON.parse(JSON.stringify(tag)),
        questions: JSON.parse(JSON.stringify(queustion)),
        isNext,
      },
    };
  } catch (e) {
    return actionError(e);
  }
};

export default GetTagQuestions;
