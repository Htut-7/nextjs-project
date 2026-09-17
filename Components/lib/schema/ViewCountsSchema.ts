import z from "zod";

const ViewCountSchema = z.object({
  questionId: z.string(),
});

export default ViewCountSchema;
