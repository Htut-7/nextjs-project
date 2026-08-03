import { models, Schema, Types, model, Document } from "mongoose";

export interface ItagQuestion {
  tag: Types.ObjectId;
  question: Types.ObjectId;
}

export interface ItagQuestionDoc extends ItagQuestion, Document {}

const tagQuestionSchema = new Schema({
  tag: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Tag",
  },
  question: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Question",
  },
});

tagQuestionSchema.index({ tags: 1, question: 1 }, { unique: true });

const tagQuestion =
  models?.tagQuestion || model<ItagQuestion>("tagQuestion", tagQuestionSchema);

export default tagQuestion;
