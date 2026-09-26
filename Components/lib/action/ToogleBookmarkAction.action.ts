"use server";

import { auth } from "@/auth";
import dbConnect from "../dbconnect";
import ToogleBookmarkSchema from "../schema/ToogleBookmarkSchema";
import validatebody from "../validateBodyTemp";
import User from "@/database/user.model";
import { actionError } from "../response";
import Question from "@/database/question.model";
import Collection from "@/database/collection.model";

export async function ToogleBookmarkAction(params: {
  questionId: string;
}): Promise<{
  success: boolean;
  data?: {
    saved: boolean;
  };
  message?: string;
  details?: object | null;
}> {
  await dbConnect();
  const validatedData = validatebody(params, ToogleBookmarkSchema);
  const { questionId } = validatedData;

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

  try {
    const question = await Question.findById(questionId);
    if (!question) {
      throw new Error("Question not found");
    }

    const collection = await Collection.findOne({
      question: questionId,
      author: userId,
    });

    if (collection) {
      await Collection.findByIdAndDelete(collection._id);
      return {
        success: true,
        data: {
          saved: false,
        },
      };
    }

    await Collection.create({
      author: userId,
      question: questionId,
    });

    return {
      success: true,
      data: {
        saved: true,
      },
    };
  } catch (e) {
    return actionError(e);
  }
}
