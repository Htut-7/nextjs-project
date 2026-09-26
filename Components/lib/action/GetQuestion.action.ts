"use server";

import dbConnect from "../dbconnect";
import validatebody from "../validateBodyTemp";
import { actionError } from "../response";
import Question, { Iquestion } from "@/database/question.model";
import GetQuestionSchema from "../schema/GetQuestionSchema";
import Collection from "@/database/collection.model";
import { auth } from "@/auth";
import User from "@/database/user.model";

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

    const userId = user._id;

    const collection = await Collection.findOne({
      author: userId,
      question: questionId,
    });

    return {
      success: true,
      data: { ...JSON.parse(JSON.stringify(question)), saved: !!collection },
    };
  } catch (e) {
    return actionError(e);
  }
}
