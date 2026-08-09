import dbConnect from "@/Components/lib/dbconnect";
import User from "@/database/user.model";
import {
  handleErrorResponse,
  handleSuccessResponse,
} from "@/Components/lib/response";
import validatebody from "@/Components/lib/validateBodyTemp";
import UserSchema from "@/Components/lib/schema/UserSchema";

export async function GET() {
  try {
    await dbConnect();
    const users = await User.find();
    return handleSuccessResponse(users);
  } catch (e) {
    return handleErrorResponse(e);
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    let body = await request.json();

    validatebody(body, UserSchema);

    const existingEmail = await User.findOne({ email: body.email });
    if (existingEmail) throw new Error("Email already exists");

    const existingName = await User.findOne({ username: body.username });
    if (existingName) throw new Error("Username already exists");

    const newUser = await User.create(body);

    return handleSuccessResponse(newUser, 201);
  } catch (e: unknown) {
    return handleErrorResponse(e);
  }
}
