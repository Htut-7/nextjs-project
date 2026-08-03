import { models, Schema, Types, model } from "mongoose";

export interface ItagQuestion {
  tag: Types.ObjectId;
  question: Types.ObjectId;
}

export interface ItagQuestionDoc extends ItagQuestion {}

const tagQuestionSchema = new Schema({
  tag: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "Tag",
  },
  question: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "Question",
  },
});

tagQuestionSchema.index({ tags: 1, question: 1 }, { unique: true });

const tagQuestion =
  models?.tagQuestion || model("tagQuestion", tagQuestionSchema);

export default tagQuestion;
