import connectDB from "@/lib/db";
import Order from "@/model/order.models";
import { asyncHandler } from "@/utils/asyncHandler";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(async (req: NextRequest) => {
  await connectDB();

  // Fetch orders and sort by newest first
  const orders = await Order.find({}).populate("user").sort({ createdAt: -1 });

  // Returning "orders" (plural) matches your frontend result.data.orders
  return NextResponse.json({ orders }, { status: 200 });
});
