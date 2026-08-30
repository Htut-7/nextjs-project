import { Schema, Document, models, model } from "mongoose";

export interface Ianswer {
  author: string;
  question: string;
  content: string;
  upvotes: number;
  downvotes: number;
}

export interface IanswerDoc extends Ianswer, Document {}

const answerSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    question: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Question",
    },
    content: {
      type: String,
      required: true,
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Answer = models?.Answer || model<Ianswer>("Answer", answerSchema);
export default Answer;
