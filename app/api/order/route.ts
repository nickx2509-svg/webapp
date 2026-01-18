import { auth } from "@/auth";
import connectDB from "@/lib/db";
import Order from "@/model/order.models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    console.log("Database Connected");

    const session = await auth();
    console.log("Session User:", session?.user?.email);

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorised" },
        { status: 401 },
      );
    }

    const body = await req.json();
    console.log("Received Body:", JSON.stringify(body, null, 2));

    const { userId, groceery, paymentType, totalAmount, address } = body;

    if (!userId || !groceery || !paymentType || !totalAmount || !address) {
      return NextResponse.json(
        { success: false, message: "Missing fields" },
        { status: 400 },
      );
    }

    const newOrder = await Order.create({
      user: userId,
      groceery,
      paymentType,
      totalAmount,
      address,
    });

    console.log("Order Saved Successfully!");

    // ✅ SET COOKIE ON SUCCESS
    const response = NextResponse.json(
      { success: true, data: newOrder },
      { status: 201 },
    );

    response.cookies.set("order-success", "true", {
      httpOnly: true,
      path: "/", // 🚨 MUST
      maxAge: 60*3,
    });

    return response;
  } catch (error: any) {
    console.error("DETAILED MONGODB ERROR:", error.message);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        errorDetails: error.message,
      },
      { status: 500 },
    );
  }
}
