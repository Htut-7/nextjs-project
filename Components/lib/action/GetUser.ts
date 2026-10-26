"use server";

import User, { Iuser } from "@/database/user.model";
import dbConnect from "../dbconnect";
import validatebody from "../validateBodyTemp";
import GetUserSchema from "../schema/GetUserSchema";
import Question from "@/database/question.model";
import Answer from "@/database/answer.model";
import { actionError } from "../response";

export async function GetUser(params: { userId: string }): Promise<{
  success: boolean;
  data?: {
    user: Iuser;
    isNext?: boolean;
    totalQuestion: number;
    totalAnswer: number;
  };
  message?: string;
  details?: object | null;
}> {
  await dbConnect();

  try {
    const validatedData = validatebody(params, GetUserSchema);
    const { userId } = validatedData;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const [totalQuestion, totalAnswer] = await Promise.all([
      Question.countDocuments({ author: userId }),
      Answer.countDocuments({ author: userId }),
    ]);

    return {
      success: true,
      data: {
        user: JSON.parse(JSON.stringify(user)),
        totalAnswer,
        totalQuestion,
      },
    };
  } catch (e) {
    return actionError(e);
  }
}
