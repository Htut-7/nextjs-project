import Question from "@/database/question.model";
import ViewCountSchema from "../schema/ViewCountsSchema";
import validatebody from "../validateBodyTemp";
import { actionError } from "../response";
import { TbRulerMeasure } from "react-icons/tb";

export async function ViewCount(params: {
  params: { questionId: string };
}): Promise<{
  success: boolean;
  data?: { view: number };
  message?: string;
  details?: object | null;
}> {
  const validatedData = validatebody(params, ViewCountSchema);
  const { questionId } = validatedData.data;

  try {
    const question = await Question.findById(questionId);
    if (!question) throw new Error("Question not found.");

    question.view += 1;
    await question.save();

    return {
      success: true,
      data: {
        view: question.view,
      },
    };
  } catch (e) {
    return actionError(e);
  }
}
