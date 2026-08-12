import {
  handleSuccessResponse,
  handleErrorResponse,
} from "@/Components/lib/response";
import UserSchema from "@/Components/lib/schema/UserSchema";
import validatebody from "@/Components/lib/validateBodyTemp";
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
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return handleSuccessResponse(user);
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
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new Error("User not found");
    }
    return handleSuccessResponse(user);
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
    console.log("BODY:", body);
    const validatedData = validatebody(body, UserSchema, true);
    console.log("BODY:", body);

    const user = await User.findByIdAndUpdate(id, validatedData, {
      new: true,
    });
    if (!user) {
      throw new Error("User not found");
    }
    return handleSuccessResponse(user);
  } catch (e) {
    return handleErrorResponse(e);
  }
}
