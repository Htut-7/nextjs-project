import { Schema, model, models, Document } from "mongoose";

export interface Itag {
  name: string;
  questions: Number;
}

export interface ItagDoc extends Itag, Document {}

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

const Tags = models?.Tag || model<Itag>("Tag", tagSchema);

export default Tags;
