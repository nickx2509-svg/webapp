import mongoose, { Document } from "mongoose";

export interface ItemsI extends Document {
  name: string;
  category: "vegetables" | "fruits" | "groceries" | "fashion" | "electronics";
  price: number;
  image: string;
  unit: string;
}

const grocerySchema = new mongoose.Schema<ItemsI>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: ["vegetables", "fruits", "groceries", "fashion", "electronics"],
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    unit: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Grocery =
  mongoose.models.Grocery || mongoose.model<ItemsI>("Grocery", grocerySchema);

export default Grocery;
