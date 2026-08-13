import { z } from "zod";

const AccountSchema = z.object({
  userId: z.string(),
  name: z.string(),
  image: z.string(),
  password: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
});

export default AccountSchema;
