import { Schema, Types, model, models } from "mongoose";

export interface Iquestion {
  title: string;
  Content: string;
  Tags: Types.ObjectId[];
  Views: string;
  Upvotes: Number;
  Downvotes: Number;
  Answers: Number;
  Author: Types.ObjectId;
}

export interface IquestionDoc extends Iquestion {}

const questionSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
    answers: {
      type: Number,
      default: 0,
    },
    author: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "Users",
    },
  },
  { timestamps: true }
);

const Question = models?.Question || model("Question", questionSchema);

export default Question;
