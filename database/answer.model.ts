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
      require: true,
      ref: "Users",
    },
    question: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "Question",
    },
    content: {
      type: String,
      require: true,
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
