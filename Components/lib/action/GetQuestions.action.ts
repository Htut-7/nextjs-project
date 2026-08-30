"use server";

import Question, { IquestionDoc } from "@/database/question.model";
import dbConnect from "../dbconnect";
import validatebody from "../validateBodyTemp";
import PaginatedSearchParamsSchema from "../schema/PaginatedSearchParamsSchema";
import { actionError } from "../response";
import { FilterQuery } from "mongoose";

export async function GetQuestions(params: {
  page?: number;
  pageSize?: number;
  search?: string;
  filter?: string;
  sort?: string;
}): Promise<{
  data?: {
    questions: IquestionDoc[];
    isNext: Boolean;
  };
  success: Boolean;
  message?: string;
  detail?: object | null;
}> {
  await dbConnect();
  const validatedData = validatebody(params, PaginatedSearchParamsSchema);
  const { page = 1, pageSize = 10, search, filter, sort } = validatedData;

  const skip = (Number(page) - 1) * pageSize;
  const limit = Number(pageSize);

  const filterQuery: FilterQuery<typeof Question> = {};

  if (filter === "recommended") {
    return { success: true, data: { questions: [], isNext: false } };
  }

  if (search) {
    filterQuery.$or = [
      { title: { $regex: new RegExp(search, "i") } },
      { content: { $regex: new RegExp(search, "i") } },
    ];
  }

  let sortingCriteria = {};

  switch (filter) {
    case "newest": {
      sortingCriteria = { createdAt: -1 };
      break;
    }

    case "unanswered": {
      filterQuery.answers = 0;
      sortingCriteria = { createdAt: -1 };
      break;
    }

    case "popular": {
      sortingCriteria = { upVotes: -1 };
      break;
    }

    default: {
      sortingCriteria = { createdAt: -1 };
    }
  }

  try {
    const totalQuestions = await Question.countDocuments(filterQuery);
    const questions = await Question.find(filterQuery)
      .populate("tags", "name")
      .populate("author", "name, image")
      .lean()
      .sort(sortingCriteria)
      .skip(skip)
      .limit(limit);

    const isNext = totalQuestions > skip + questions.length;

    return {
      success: true,
      data: {
        questions: JSON.parse(JSON.stringify(questions)),
        isNext,
      },
    };
  } catch (e) {
    return actionError(e);
  }
}
