import { ZodSchema, ZodError } from "zod";

const validatebody = (body: unknown, schema: ZodSchema, partial = false) => {
  const validatedData = partial
    ? schema.partial().safeParse(body)
    : schema.safeParse(body);

  if (!validatedData.success) {
    throw new ZodError(validatedData.error.issues);
  }
  return validatedData.data;
};

export default validatebody;
