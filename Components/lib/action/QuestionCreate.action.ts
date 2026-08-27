"use server";

import dbConnect from "../dbconnect";
import validatebody from "../validateBodyTemp";
import QuestionCreateSchema from "../schema/QuestionCreateSchema";
import mongoose from "mongoose";
import { auth } from "@/auth";
import { actionError } from "../response";
import Question from "@/database/question.model";
import tagQuestion from "@/database/tag-question.model";
import Tags from "@/database/tags.model";
import User from "@/database/user.model";

export async function QuestionCreate(params: {
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
  const validatedData = validatebody(params, QuestionCreateSchema);
  const { title, content, tags } = validatedData;

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

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let [question] = await Question.create(
      [
        {
          title,
          content,
          author: user._id,
        },
      ],
      { session }
    );
    if (!question) {
      throw new Error("Fail to create Question");
    }

    const tagIds: mongoose.Types.ObjectId[] = [];
    const tagQuestionDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tags.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $inc: { questions: 1 } },
        { upsert: true, returnDocument: "after", session }
      );

      tagIds.push(existingTag._id);
      tagQuestionDocuments.push({
        tag: existingTag._id,
        question: question._id,
      });
    }

    await tagQuestion.insertMany(tagQuestionDocuments, { session });

    await Question.findByIdAndUpdate(
      question._id,
      { $push: { tags: { $each: tagIds } } },
      { session }
    );

    await session.commitTransaction();
    return { success: true, data: JSON.parse(JSON.stringify(question)) };
  } catch (e) {
    await session.abortTransaction();
    return actionError(e);
  } finally {
    await session.endSession();
  }
}
