import z from "zod";

const ToogleBookmarkSchema = z.object({
  questionId: z.string(),
});

export default ToogleBookmarkSchema;
