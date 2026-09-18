import Question from "@/database/question.model";
import ViewCountSchema from "../schema/ViewCountsSchema";
import validatebody from "../validateBodyTemp";
import { actionError } from "../response";

export async function ViewCount(params: { questionId: string }): Promise<{
  success: boolean;
  data?: { views: number };
  message?: string;
  details?: object | null;
}> {
  const validatedData = validatebody(params, ViewCountSchema);
  const { questionId } = validatedData;

  try {
    const question = await Question.findById(questionId);
    if (!question) throw new Error("Question not found.");

    question.views += 1;
    await question.save();

    return {
      success: true,
      data: {
        views: question.views,
      },
    };
  } catch (e) {
    return actionError(e);
  }
}
