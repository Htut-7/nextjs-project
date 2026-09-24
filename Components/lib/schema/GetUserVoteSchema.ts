import z from "zod";

const GetUserVoteSchema = z.object({
  type: z.enum(["answer", "question"]),
  typeId: z.string(),
});

export default GetUserVoteSchema;
