import z from "zod";

const CreateAnswerSchema = z.object({
  questionId: z.string(),
  content: z.string(),
});

export default CreateAnswerSchema;
