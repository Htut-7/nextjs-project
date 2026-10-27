import z from "zod";

const GetUserQuestionSchema = z.object({
  userId: z.string(),
  page: z.number().positive().optional(),
  pageSize: z.number().positive().optional(),
});

export default GetUserQuestionSchema;
