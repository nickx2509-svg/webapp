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

    // If session is null, it might be the reason for the 500 error
    if (!session) {
      console.log("Error: No Session Found");
    }

    const body = await req.json();
    console.log("Received Body:", JSON.stringify(body, null, 2));

    const { userId, groceery, paymentType, totalAmount, address } = body;

    // Check if any field is empty before trying to save
    if (!userId || !groceery || !paymentType || !totalAmount || !address) {
      console.log("Validation Failed: Missing Fields");
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
    return NextResponse.json(
      { success: true, data: newOrder },
      { status: 201 },
    );
  } catch (error: any) {
    // THIS IS THE MOST IMPORTANT PART
    console.error("DETAILED MONGODB ERROR:", error.message);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        errorDetails: error.message, // This will show you exactly what is wrong in the browser console
      },
      { status: 500 },
    );
  }
}
