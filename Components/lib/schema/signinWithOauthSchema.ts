import { z } from "zod";

const signinWithOauthSchema = z.object({
  provider: z.enum(["github", "google"]),
  providerAccountId: z.string(),
  user: z.object({
    name: z.string().min(1),
    username: z.string().min(3),
    email: z.string().email(),
    image: z.string().url().optional(),
  }),
});

export default signinWithOauthSchema;
