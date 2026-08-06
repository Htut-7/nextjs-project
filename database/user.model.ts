import { model, Schema, Document, models } from "mongoose";

export interface Iuser {
  name: string;
  username: string;
  email: string;
  bio?: string;
  Image: string;
  Location?: string;
  Portfolio?: string;
  Reputation?: string;
}

export interface Iuserdoc extends Iuser, Document {}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    bio: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    portfolio: {
      type: String,
    },
    reputation: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = models?.User || model<Iuser>("User", userSchema);

export default User;
