import { model, Schema, Document, models } from "mongoose";

export interface Iuser {
  name: string;
  UserName: string;
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
    image: {
      type: String,
      require: true,
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
