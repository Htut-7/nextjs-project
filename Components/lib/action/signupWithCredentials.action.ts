"use server";

import dbConnect from "../dbconnect";
import mongoose from "mongoose";
import { actionError } from "../response";
import validatebody from "../validateBodyTemp";
import signupSchema from "../schema/signUpSchema";
import User from "@/database/user.model";
import Account from "@/database/account.model";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";

export async function signupWithCredentials(params: {
  name: string;
  email: string;
  password: string;
  username: string;
}) {
  await dbConnect();
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const validatedData = validatebody(params, signupSchema);
    const { name, email, username, password } = validatedData;

    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      throw new Error("Email already exists");
    }

    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      throw new Error("Username already exists");
    }

    const [newUser] = await User.create(
      [
        {
          name,
          email,
          username,
        },
      ],
      { session }
    );

    await Account.create(
      [
        {
          userId: newUser._id,
          name,
          password: await bcrypt.hash(password, 10),
          provider: "credentials",
          providerAccountId: email,
        },
      ],
      { session }
    );
    await session.commitTransaction();
    await signIn("credentials", { email, password, redirect: false });

    return { success: true };
  } catch (error) {
    await session.abortTransaction();
    return actionError(error);
  } finally {
    await session.endSession();
  }
}
