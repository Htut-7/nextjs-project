import { z } from "zod";

const UserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  username: z.string().min(6),
  image: z.string().url(),
});

export default UserSchema;
