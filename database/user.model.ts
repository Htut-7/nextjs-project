import { model, Schema } from "mongoose";

interface Iuser {
  name: string;
  UserName: string;
  email: string;
  bio?: string;
  Image: string;
  Location?: string;
  Portfolio?: string;
  Reputation?: string;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    UserName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    bio: {
      type: String,
    },
    Image: {
      type: String,
      require: true,
    },
    Location: {
      type: String,
    },
    Portfolio: {
      type: String,
    },
    Reputation: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = model<Iuser>("User", userSchema);

export default User;
