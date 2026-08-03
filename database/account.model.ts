import { model, Schema, Types, Document, models } from "mongoose";

export interface Iaccount {
  userId: Types.ObjectId;
  name: string;
  Image: string;
  Password: string;
  Provider: string;
  ProviderAccountId: string;
}

export interface Iaccountdoc extends Iaccount, Document {}

const accountSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    image: {
      type: String,
    },
    password: {
      type: String,
    },
    provider: {
      type: String,
      require: true,
    },
    providerAccountId: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Account = models?.Account || model<Iaccount>("Account", accountSchema);

export default Account;
