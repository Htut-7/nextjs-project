"use server";

import dbConnect from "../dbconnect";
import validatebody from "../validateBodyTemp";
import { actionError } from "../response";
import Question, { Iquestion } from "@/database/question.model";
import GetQuestionSchema from "../schema/GetQuestionSchema";

export async function GetQuestion(params: {
  questionId: string;
  title: string;
  content: string;
  tags: string[];
}): Promise<{
  success: boolean;
  data?: Iquestion;
}> {
  await dbConnect();
  const validatedData = validatebody(params, GetQuestionSchema);
  const { questionId } = validatedData;

  try {
    const question = await Question.findById(questionId).populate("tags");
    if (!question) {
      throw new Error("Fail to get a Question");
    }

    return { success: true, data: JSON.parse(JSON.stringify(question)) };
  } catch (e) {
    return actionError(e);
  }
}
