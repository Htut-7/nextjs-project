"use server";

import Answer, { IanswerDoc } from "@/database/answer.model";
import dbConnect from "../dbconnect";
import mongoose from "mongoose";
import { actionError } from "../response";
import validatebody from "../validateBodyTemp";
import CreateAnswerSchema from "../schema/CreateAnswerSchema";
import Question from "@/database/question.model";
import User from "@/database/user.model";
import { auth } from "@/auth";

export async function CreateAnswer(params: {
  questionId: string;
  content: string;
}): Promise<{
  success: boolean;
  data?: { newAnswer: IanswerDoc };
  message?: string;
  details?: object | null;
}> {
  await dbConnect();

  const session = await mongoose.startSession();

  try {
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

    const validatedData = validatebody(params, CreateAnswerSchema);
    const { questionId, content } = validatedData;

    session.startTransaction();

    const question = await Question.findById(questionId);

    if (!question) {
      throw new Error("Question not found.");
    }

    const [newAnswer] = await Answer.create(
      [
        {
          author: user._id,
          question: questionId,
          content,
        },
      ],
      { session }
    );

    question.answers += 1;

    await question.save({ session });
    await session.commitTransaction();

    return {
      success: true,
      data: {
        newAnswer: JSON.parse(JSON.stringify(newAnswer)),
      },
    };
  } catch (e) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }

    return actionError(e);
  } finally {
    await session.endSession();
  }
}
