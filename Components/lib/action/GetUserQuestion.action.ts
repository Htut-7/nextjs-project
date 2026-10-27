"use server";

import Question, { IquestionDoc } from "@/database/question.model";
import dbConnect from "../dbconnect";
import { actionError } from "../response";
import validatebody from "../validateBodyTemp";
import GetUserQuestionSchema from "../schema/GetUserQuestionSchema";

export async function GetUserQuestion(params: {
  userId: string;
  page?: number;
  pageSize?: number;
}): Promise<{
  success: boolean;
  data?: {
    question: IquestionDoc[];
    isNext?: boolean;
  };
  message?: string;
  details?: object | null;
}> {
  await dbConnect();

  const validatedData = validatebody(params, GetUserQuestionSchema);
  const { userId, page = 1, pageSize = 10 } = validatedData;

  const skip = (Number(page) - 1) * 10;
  const limit = Number(pageSize);

  try {
    const totalQuestions = await Question.countDocuments({ author: userId });

    const questions = await Question.find({ author: userId })
      .populate("tags", "name")
      .populate("author", "name image")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const isNext = totalQuestions > skip + questions.length;

    return {
      success: true,
      data: {
        question: JSON.parse(JSON.stringify(questions)),
        isNext,
      },
    };
  } catch (e) {
    return actionError(e);
  }
}
