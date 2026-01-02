import { auth } from "@/auth";
import uploadOnCloudinary from "@/lib/cloundinary";
import connectDB from "@/lib/db";
import Grocery from "@/model/items.model";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncHandler(async (req: NextRequest) => {
  await connectDB();
  const session = await auth();
  if (session?.user?.role !== "admin") {
    throw new ApiError(403, "You are not admin");
  }
  const formData = await req.formData();
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const price = formData.get("price") as string;
  const unit = formData.get("unit") as string;
  const file = formData.get("image") as Blob | null;
  let imageUrl;
  if (file) {
    imageUrl = await uploadOnCloudinary(file);
  }
  if (!imageUrl) {
    throw new ApiError(400, "Image uplaod Failed");
  }
  const grocery = await Grocery.create({
    name,
    category,
    price,
    unit,
    image: imageUrl,
  });
  return NextResponse.json(
    new ApiResponse(201, grocery, "Itema added successfully")
  );
});
