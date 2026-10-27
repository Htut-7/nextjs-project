import z from "zod";

const GetUserAnswerSchema = z.object({
  userId: z.string(),
  page: z.number().positive().optional(),
  pageSize: z.number().positive().optional(),
});

export default GetUserAnswerSchema;
