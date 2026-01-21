import { auth } from "@/auth";
import connectDB from "@/lib/db";
import Order from "@/model/order.models";
import User from "@/model/user.model";
import { ApiError } from "@/utils/ApiError";
import { asyncHandler } from "@/utils/asyncHandler";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = asyncHandler(async (req: NextRequest) => {
  await connectDB();

  const authSession = await auth();
  if (!authSession) {
    throw new ApiError(401, "Unauthorised");
  }

  const body = await req.json();
  const { userId, groceery, paymentType, totalAmount, address } = body;

  if (!userId || !groceery || !paymentType || !totalAmount || !address) {
    throw new ApiError(400, "Missing fields");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const newOrder = await Order.create({
    user: userId,
    groceery,
    paymentType,
    totalAmount,
    address,
  });

  console.log("Order Saved Successfully!");

  const StripeSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${process.env.NEXTAUTH_URL}/order-success`,
    cancel_url: `${process.env.NEXTAUTH_URL}/checkout`,
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: "Zepto",
          },
          unit_amount: totalAmount * 100,
        },
        quantity: 1,
      },
    ],
    metadata: {
      orderId: newOrder._id.toString(),
    },
  });

  return NextResponse.json({ url: StripeSession.url }, { status: 200 });
});
