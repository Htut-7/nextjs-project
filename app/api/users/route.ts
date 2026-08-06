import dbConnect from "@/Components/lib/dbconnect";
import User from "@/database/user.model";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("API route hit");

  try {
    await dbConnect();
    const users = await User.find();

    return NextResponse.json(
      {
        data: users,
        success: true,
      },
      { status: 200 }
    );
  } catch (e) {
    console.error("FULL ERROR:");
    console.error(e);

    return NextResponse.json(
      {
        message: e instanceof Error ? e.message : "Something went wrong",
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    let body = await request.json();

    const existingEmail = await User.findOne({ email: body.email });
    if (existingEmail) throw new Error("Email already exists");

    const existingName = await User.findOne({ username: body.username });
    if (existingName) throw new Error("Username already exists");

    const newUser = await User.create(body);

    return NextResponse.json(
      {
        data: newUser,
        success: true,
        status: 201,
      },
      { status: 201 }
    );
  } catch (e: unknown) {
    return NextResponse.json(
      {
        message: e instanceof Error ? e.message : "Something went Wrong",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
