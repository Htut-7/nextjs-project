import { ZodSchema, ZodError } from "zod";

const validatebody = (body: unknown, schema: ZodSchema) => {
  const validatedData = schema.safeParse(body);

  if (!validatedData.success) {
    throw new ZodError(validatedData.error.issues);
  }
  return validatedData;
};

export default validatebody;
