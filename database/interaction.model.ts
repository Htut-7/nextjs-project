import { Schema, Types, Document, model, models } from "mongoose";

export interface Iinteraction {
  user: Types.ObjectId;
  action: string;
  action_id: Types.ObjectId;
  actiontype: string;
}

export interface IinteractionDoc extends Iinteraction, Document {}

const interactionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    action: {
      type: String,
      required: true,
    },
    action_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    actiontype: {
      type: String,
      required: true,
      enum: ["question", "answer"],
    },
  },
  { timestamps: true }
);

const Interaction =
  models?.Interaction || model<Iinteraction>("Interaction", interactionSchema);
export default Interaction;
