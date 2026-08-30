import { Schema, Types, model, models, Document } from "mongoose";

export interface Iquestion {
  title: string;
  content: string;
  tags: Types.ObjectId[];
  views: string;
  upvotes: number;
  downvotes: number;
  answers: number;
  author: Types.ObjectId;
}

export interface IquestionDoc extends Iquestion, Document {}

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
      ref: "User",
    },
  },
  { timestamps: true }
);

const Question =
  models?.Question || model<Iquestion>("Question", questionSchema);

export default Question;
