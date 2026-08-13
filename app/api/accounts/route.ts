import dbConnect from "@/Components/lib/dbconnect";
import User from "@/database/user.model";
import {
  handleErrorResponse,
  handleSuccessResponse,
} from "@/Components/lib/response";
import validatebody from "@/Components/lib/validateBodyTemp";
import UserSchema from "@/Components/lib/schema/UserSchema";
import Account from "@/database/account.model";
import AccountSchema from "@/Components/lib/schema/AccountSchema";

export async function GET() {
  try {
    await dbConnect();
    const accounts = await Account.find();
    return handleSuccessResponse(accounts);
  } catch (e) {
    return handleErrorResponse(e);
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    let body = await request.json();
    const { provider, providerAccountId } = body;

    validatebody(body, AccountSchema);

    const existingAccount = await Account.findOne({
      provider,
      providerAccountId,
    });
    if (existingAccount) throw new Error("Account already exists");

    const newAccount = await Account.create(body);

    return handleSuccessResponse(newAccount, 201);
  } catch (e: unknown) {
    return handleErrorResponse(e);
  }
}
