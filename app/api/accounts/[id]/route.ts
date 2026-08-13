import {
  handleSuccessResponse,
  handleErrorResponse,
} from "@/Components/lib/response";
import AccountSchema from "@/Components/lib/schema/AccountSchema";
import UserSchema from "@/Components/lib/schema/UserSchema";
import validatebody from "@/Components/lib/validateBodyTemp";
import Account from "@/database/account.model";
import User from "@/database/user.model";
import { Types } from "mongoose";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid Id");
    }
    const account = await Account.findById(id);
    if (!account) {
      throw new Error("Account not found");
    }
    return handleSuccessResponse(account);
  } catch (e) {
    return handleErrorResponse(e);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid Id");
    }
    const account = await Account.findByIdAndDelete(id);
    if (!account) {
      throw new Error("Account not found");
    }
    return handleSuccessResponse(account);
  } catch (e) {
    return handleErrorResponse(e);
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid Id");
    }

    const body = await request.json();
    const validatedData = validatebody(body, AccountSchema, true);

    const account = await Account.findByIdAndUpdate(id, validatedData, {
      new: true,
    });
    if (!account) {
      throw new Error("User not found");
    }
    return handleSuccessResponse(account);
  } catch (e) {
    return handleErrorResponse(e);
  }
}
