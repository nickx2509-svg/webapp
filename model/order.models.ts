import mongoose from "mongoose";

// Interface for TypeScript type checking
export interface orderI {
  _id?: mongoose.Types.ObjectId | null;
  user: mongoose.Types.ObjectId;
  groceery: {
    item: mongoose.Types.ObjectId;
    name: string;
    unit: string;
    quantity: number;
    price: string;
    image: string;
  }[]; // Defined as an array of objects
  totalAmount: string;
  isPaid?: "true" | "false";
  paymentType: "cod" | "online";
  address: {
    fullName: string;
    city: string;
    pincode: number;
    fullAddress: string;
    mobile: string;
    latitude: number;
    longitude: number;
  };
  status: "pending" | "out of delivered" | "delivered";
}

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    // Updated groceery to ensure the internal item ID is required
    groceery: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Grocery",
          required: true,
        },
        name: { type: String, required: true },
        unit: String,
        quantity: { type: Number, required: true },
        price: { type: String, required: true },
        image: String,
      },
    ],
    totalAmount: {
      type: String,
      required: [true, "Total amount is required"],
    },
    isPaid: {
      type: String,
      enum: ["true", "false"],
      default: "false",
    },
    paymentType: {
      type: String,
      enum: ["cod", "online"],
      default: "cod",
    },
    address: {
      fullName: { type: String, required: true },
      city: { type: String, required: true },
      pincode: { type: Number, required: true },
      fullAddress: { type: String, required: true },
      mobile: { type: String, required: true },
      latitude: Number,
      longitude: Number,
    },
    status: {
      type: String,
      enum: ["pending", "out of delivered", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true },
);

// This line is very important for Next.js to prevent re-compiling models
const Order =
  mongoose.models.Order || mongoose.model<orderI>("Order", orderSchema);
export default Order;
