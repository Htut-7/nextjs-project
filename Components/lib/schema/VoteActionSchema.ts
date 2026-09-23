import z from "zod";

const VoteActionSchema = z.object({
  typeId: z.string(),
  type: z.enum(["question", "answer"]),
  voteType: z.enum(["upvote", "downvote"]),
});

export default VoteActionSchema;
