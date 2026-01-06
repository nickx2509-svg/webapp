import { auth } from "@/auth";
import User from "@/model/user.model";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(async (req: NextRequest) => {
  const session = await auth();

  if (!session || !session.user?.email) {
    return NextResponse.json(
      new ApiResponse(401, null, "User is not authenticated"),
      { status: 401 }
    );
  }

  const user = await User.findOne({ email: session.user.email }).select(
    "-password"
  );

  if (!user) {
    return NextResponse.json(new ApiResponse(404, null, "User not found"), {
      status: 404,
    });
  }

  return NextResponse.json(
    new ApiResponse(200, user, "User fetched successfully"),
    { status: 200 }
  );
});
