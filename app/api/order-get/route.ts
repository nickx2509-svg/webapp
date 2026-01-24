import { auth } from "@/auth";
import connectDB from "@/lib/db";
import Order from "@/model/order.models";
import User from "@/model/user.model";
import { asyncHandler } from "@/utils/asyncHandler";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(async (req: NextRequest) => {
  await connectDB();
  const session = await auth();
  const orders = await Order.find({user:session?.user?.id}).populate("user")
  if(!orders){
    return NextResponse.json(
      {message:"Orders not found"},
      { status:400}
    )
  }
  return NextResponse.json(
    {orders}
  )



});
