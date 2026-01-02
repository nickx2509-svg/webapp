import connectDB from "@/lib/db";
import User from "@/model/user.model";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  return asyncHandler(async () => {
    await connectDB();

    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      throw new ApiError(400, "All fields are required");
    }

    if (password.length < 8) {
      throw new ApiError(400, "Password must be at least 8 characters");
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      throw new ApiError(400, "Invalid email address");
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { name }],
    });

    if (existingUser) {
      throw new ApiError(409, "User already exists");
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });

    return NextResponse.json(
      new ApiResponse(
        201,
        {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
        "User registered successfully"
      ),
      { status: 201 }
    );
  })();
}
