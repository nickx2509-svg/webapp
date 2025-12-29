import { auth } from "@/auth";
import connectDB from "@/lib/db";
import User from "@/model/user.model";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncHandler(async (req: NextRequest) => {
  // 1️⃣ Connect DB
  await connectDB();

  // 2️⃣ Parse body
  const { role, mobile } = await req.json();

  // 3️⃣ Auth check
  const session = await auth();
  if (!session?.user?.email) {
    throw new ApiError(401, "Unauthorized");
  }

  // 4️⃣ Update user
  const user = await User.findOneAndUpdate(
    { email: session.user.email },
    { role, mobile },
    { new: true }
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // 5️⃣ Success response
  return NextResponse.json(
    new ApiResponse(200, "Profile updated successfully", user),
    { status: 200 }
  );
});
