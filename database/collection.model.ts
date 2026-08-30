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
      required: true,
      ref: "User",
    },
    question: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Question",
    },
  },
  { timestamps: true }
);

collectionSchema.index({ author: 1, question: 1 }, { unique: true });

const Collection = models.Collection || model("Collection", collectionSchema);

export default Collection;
