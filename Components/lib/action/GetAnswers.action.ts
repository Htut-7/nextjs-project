"use server";

import Answer, { Ianswer } from "@/database/answer.model";
import dbConnect from "../dbconnect";
import validatebody from "../validateBodyTemp";
import GetAnswersSchema from "../schema/GetAnswersSchema";
import { actionError } from "../response";

export async function GetAnswers(params: {
  page: number;
  pageSize: number;
  filter: string;
  questionId: string;
}): Promise<{
  success: boolean;
  data?: {
    answers: Ianswer[];
    isNext: boolean;
    totalAnswers: number;
  };
  message?: string;
  details?: object | null;
}> {
  await dbConnect();

  const validatedData = validatebody(params, GetAnswersSchema);
  const { page = 1, pageSize = 10, filter, questionId } = validatedData;

  const skip = (Number(page) - 1) * pageSize;
  const limit = Number(pageSize);

  let sortingCriteria = {};

  switch (filter) {
    case "latest":
      sortingCriteria = { createdAt: -1 };
      break;

    case "oldest":
      sortingCriteria = { createdAt: 1 };
      break;

    case "popular":
      sortingCriteria = { upvotes: -1 };
      break;

    default:
      sortingCriteria = { createdAt: -1 };
      break;
  }

  try {
    const totalAnswers = await Answer.countDocuments({ question: questionId });

    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id name image")
      .sort(sortingCriteria)
      .skip(skip)
      .limit(limit);

    const isNext = totalAnswers > skip + answers.length;

    return {
      success: true,
      data: {
        answers: JSON.parse(JSON.stringify(answers)),
        totalAnswers,
        isNext,
      },
    };
  } catch (e) {
    return actionError(e);
  }
}
