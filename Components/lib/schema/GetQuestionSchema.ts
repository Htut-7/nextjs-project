import { z } from "zod";

const GetQuestionSchema = z.object({
  questionId: z.string(),
});

export default GetQuestionSchema;
