"use server";

import dbConnect from "../dbconnect";
import { actionError } from "../response";
import validatebody from "../validateBodyTemp";
import User from "@/database/user.model";
import { signIn } from "@/auth";
import signInSchema from "../schema/signInSchema";
import Account from "@/database/account.model";
import bcrypt from "bcryptjs";

export async function signInWithCredentials(params: {
  email: string;
  password: string;
}) {
  await dbConnect();

  try {
    const validatedData = validatebody(params, signInSchema);
    const { email, password } = validatedData;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new Error("User not found");
    }

    const account = await Account.findOne({
      provider: "credentials",
      providerAccountId: email,
    });

    if (!account) {
      throw new Error("Account not found");
    }

    const matchPassword = await bcrypt.compare(password, account.password);

    if (!matchPassword) {
      throw new Error("Wrong Password");
    }

    await signIn("credentials", { email, password, redirect: false });

    return { success: true };
  } catch (error) {
    return actionError(error);
  }
}
