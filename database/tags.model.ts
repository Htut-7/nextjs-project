import { Schema, model, models } from "mongoose";

export interface Itag {
  Name: string;
  Questions: Number;
}

export interface ItagDoc extends Itag {}

const tagSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    questions: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Tags = models?.Tag || model("Tag", tagSchema);

export default Tags;
