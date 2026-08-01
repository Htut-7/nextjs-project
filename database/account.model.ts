import { model, Schema, Types } from "mongoose";

interface Iaccount {
  userId: Types.ObjectId;
  name: string;
  Image: string;
  Password: string;
  Provider: string;
  ProviderAccountId: string;
}

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
    Image: {
      type: String,
    },
    Password: {
      type: String,
    },
    Provider: {
      type: String,
      require: true,
    },
    ProviderAccountId: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Account = model<Iaccount>("Account", accountSchema);

export default Account;
