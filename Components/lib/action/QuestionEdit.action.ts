"use server";

import dbConnect from "../dbconnect";
import validatebody from "../validateBodyTemp";
import QuestionEditSchema from "../schema/QuestionEditSchema";
import mongoose from "mongoose";
import { auth } from "@/auth";
import { actionError } from "../response";
import Question from "@/database/question.model";
import User from "@/database/user.model";

export async function QuestionEdit(params: {
  questionId: string;
  title: string;
  content: string;
  tags: string[];
}): Promise<{
  success: boolean;
  data?: {
    _id: string;
    title: string;
    content: string;
    author: string;
    tags: string[];
  };
}> {
  await dbConnect();
  const validatedData = validatebody(params, QuestionEditSchema);
  const { title, content, tags, questionId } = validatedData;

  const auth_session = await auth();

  if (!auth_session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await User.findOne({
    email: auth_session.user.email,
  });

  if (!user) {
    throw new Error("User not found");
  }

  try {
    let question = await Question.findById(questionId).populate("tags");
    if (!question) {
      throw new Error("Fail to get a Question");
    }

    if (question.title !== title || question.content !== content) {
      question.title = title;
      question.content = content;
      await question.save();
    }
    return { success: true, data: JSON.parse(JSON.stringify(question)) };
  } catch (e) {
    return actionError(e);
  }
}
