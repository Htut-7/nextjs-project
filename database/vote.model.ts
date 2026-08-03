import { Schema, Types, Document, models, model } from "mongoose";

export interface Ivote {
  author: Types.ObjectId;
  type_id: Types.ObjectId;
  type: string;
  votetype: string;
}

export interface IvoteDoc extends Ivote, Document {}

const voteSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "Users",
    },
    type_id: {
      type: Schema.Types.ObjectId,
      require: true,
    },
    type: {
      type: String,
      require: true,
      enum: ["question", "answer"],
    },
    votetype: {
      type: String,
      require: true,
      enum: ["upvote", "downvote"],
    },
  },
  { timestamps: true }
);

voteSchema.index({ author: 1, type_id: 1, type: 1 }, { unique: true });

const Vote = models?.Votes || model<Ivote>("Votes", voteSchema);
export default Vote;
