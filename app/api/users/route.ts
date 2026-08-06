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

export async function POST() {
  return NextResponse.json({
    message: " Post Hello World",
  });
}
