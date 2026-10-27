"use server";

import Answer, { IanswerDoc } from "@/database/answer.model";
import dbConnect from "../dbconnect";
import validatebody from "../validateBodyTemp";
import GetUserAnswerSchema from "../schema/GetUserAnswerSchema";
import { actionError } from "../response";

export async function GetUserAnswer(params: {
  userId: string;
  page?: number;
  pageSize?: number;
}): Promise<{
  success: boolean;
  data?: {
    answer: IanswerDoc[];
    isNext?: boolean;
  };
  message?: string;
  details?: object | null;
}> {
  await dbConnect();

  const validatedData = validatebody(params, GetUserAnswerSchema);
  const { userId, page = 1, pageSize = 10 } = validatedData;

  const skip = (Number(page) - 1) * 10;
  const limit = Number(pageSize);

  try {
    const [totalAnswer, answers] = await Promise.all([
      Answer.countDocuments({ author: userId }),
      Answer.find({ author: userId })
        .populate("author", "_id name image")
        .populate("question", "_id title")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
    ]);

    const isNext = totalAnswer > skip + answers.length;

    return {
      success: true,
      data: {
        answer: JSON.parse(JSON.stringify(answers)),
        isNext,
      },
    };
  } catch (e) {
    return actionError(e);
  }
}
