import dbConnect from "@/Components/lib/dbconnect";
import { handleSuccessResponse } from "@/Components/lib/response";
import signinWithOauthSchema from "@/Components/lib/schema/signinWithOauthSchema";
import validatebody from "@/Components/lib/validateBodyTemp";
import Account from "@/database/account.model";
import User from "@/database/user.model";
import mongoose from "mongoose";
import slugify from "slugify";

export async function POST(request: Request) {
  const { provider, providerAccountId, user } = await request.json();
  await dbConnect;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const validatedData = validatebody(
      {
        provider,
        providerAccountId,
        user,
      },
      signinWithOauthSchema
    );

    const { email, name, username, image } = validatedData.data.user;
    let existingUser = await User.findOne({
      email,
    }).session(session);

    if (!existingUser) {
      const [existingUser] = await User.create(
        [
          {
            name,
            email,
            image,
            username: slugify(username, {
              lower: true,
              trim: true,
              strict: true,
            }),
          },
        ],
        { session }
      );
    } else {
      await User.updateOne(
        {
          _id: existingUser._id,
        },
        {
          $set: {
            image,
            name,
          },
        }
      ).session(session);
    }

    const existingAccount = await Account.findOne({
      userId: existingUser.id,
      provider,
      providerAccountId,
    }).session(session);

    if (!existingAccount) {
      await Account.create(
        [
          {
            userId: existingUser.id,
            provider,
            providerAccountId,
            name,
            image,
          },
        ],
        { session }
      );
    }
    await session.commitTransaction();
    return handleSuccessResponse({
      existingUser,
    });
  } catch (error: unknown) {
    console.log(error);
    session.abortTransaction();
  } finally {
    session.endSession();
  }
}
