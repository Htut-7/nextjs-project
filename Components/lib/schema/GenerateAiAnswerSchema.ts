import z from "zod";

const GenerateAiAnswerSchema = z.object({
  title: z.string(),
  content: z.string(),
  userAnswer: z.string(),
});

export default GenerateAiAnswerSchema;
