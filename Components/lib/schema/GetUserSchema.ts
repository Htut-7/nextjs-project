import z from "zod";

const GetUserSchema = z.object({
  userId: z.string(),
});

export default GetUserSchema;
