import { auth } from "@/auth";
import uploadOnCloudinary from "@/lib/cloundinary";
import connectDB from "@/lib/db";
import Grocery from "@/model/items.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const session = await auth();
    if (session?.user?.role !== "admin") {
      return NextResponse.json(
        { message: "You are not admin" },
        { status: 403 }
      );
    }

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const price = formData.get("price") as string;
    const unit = formData.get("unit") as string;
    const description = formData.get("description") as string; // Optional
    const file = formData.get("image") as Blob | null;

    if (!file) {
      return NextResponse.json(
        { message: "Image is required" },
        { status: 400 }
      );
    }

    const imageUrl = await uploadOnCloudinary(file);
    if (!imageUrl) {
      return NextResponse.json(
        { message: "Image upload failed" },
        { status: 400 }
      );
    }

    const grocery = await Grocery.create({
      name,
      category,
      price: Number(price), // Ensure price is a number
      unit,
      image: imageUrl,
      // description: description // add this to schema if needed
    });

    return NextResponse.json(
      {
        success: true,
        data: grocery,
        message: "Item added successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("API_ERROR:", error);
    return NextResponse.json(
      {
        message: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
