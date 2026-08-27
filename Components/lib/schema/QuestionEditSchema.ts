import { z } from "zod";

const QuestionEditSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  tags: z.array(z.string()).min(1, { message: "Tags is required" }),
  questionId: z.string(),
});

export default QuestionEditSchema;
