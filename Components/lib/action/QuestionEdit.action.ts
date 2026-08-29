"use server";

import dbConnect from "../dbconnect";
import validatebody from "../validateBodyTemp";
import QuestionEditSchema from "../schema/QuestionEditSchema";
import mongoose from "mongoose";
import { auth } from "@/auth";
import { actionError } from "../response";
import Question from "@/database/question.model";
import User from "@/database/user.model";
import Tags, { ItagDoc } from "@/database/tags.model";
import tagQuestion from "@/database/tag-question.model";
import { regex } from "zod";

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
  const session = await mongoose.startSession();
  session.startTransaction();
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
      await question.save({ session });
    }

    const tagsToAdd = tags.filter(
      (tag: string) => !question.tags.includes(tag.toLowerCase())
    );

    const tagsToRemove = question.tags.filter(
      (tag: ItagDoc) => !question.tags.includes(tag.name.toLowerCase())
    );

    if (tagsToRemove.length) {
      const tagsIdToRemove = tagsToRemove.map((tag: ItagDoc) => tag._id);

      await Tags.updateMany(
        { _id: { $in: tagsIdToRemove } },
        { $inc: { questions: -1 } },
        { session }
      );

      await tagQuestion.deleteMany({
        tag: { $in: tagsIdToRemove },
        question: questionId,
      });

      question.tags = question.tags.filter(
        (tagid: mongoose.Types.ObjectId) => !tagsToRemove.includes(tagid)
      );
    }

    if (tagsToAdd.length) {
      const newTagDocuments = [];

      for (const tag of tagsToAdd) {
        const existingTag = await Tags.findOneAndUpdate(
          { name: { $regex: new RegExp(`^${tag}$`, "i") } },
          { $setOnInsert: { name: tag }, $inc: { question: 1 } },
          { upsert: true, new: true, session }
        );
        if (existingTag) {
          const existingTagQuestion = await tagQuestion.findOne({
            tag: existingTag._id,
            question: questionId,
          });
          if (!existingTagQuestion) {
            newTagDocuments.push({
              tag: existingTag._id,
              question: questionId,
            });
          }
        }

        if (
          !question.tags.find((tagId: mongoose.Types.ObjectId) =>
            tagId.equals(existingTag._id)
          )
        ) {
          question.tags.push(existingTag._id);
        }
      }

      if (newTagDocuments.length) {
        await tagQuestion.insertMany(newTagDocuments);
      }
    }
    await question.save({ session });

    await session.commitTransaction();
    return { success: true, data: JSON.parse(JSON.stringify(question)) };
  } catch (e) {
    return actionError(e);
  }
}
