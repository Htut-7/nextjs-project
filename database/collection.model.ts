import { Schema, Types, models, model, Document } from "mongoose";

export interface Icollection {
  author: Types.ObjectId;
  question: Types.ObjectId;
}

export interface IcollectionDoc extends Icollection, Document {}

const collectionSchema = new Schema(
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
  },
  { timestamps: true }
);

collectionSchema.index({ author: 1, question: 1 }, { unique: true });

const collection = models?.Collection || model("collection", collectionSchema);
export default collection;
