import mongoose, { Document } from "mongoose";

export interface ItemsI extends Document {
  name: string;
  category: string;
  price: number;
  image: string;
  unit: string;
}

const grocerySchema = new mongoose.Schema<ItemsI>(
  {
    name: { type: String, required: true, trim: true },
    // Updated Enum to match the Frontend values
    category: {
      type: String,
      enum: ["Fruits & Vegetables", "Dairy & Eggs", "Bakery & Biscuits", "Beverages", "Snacks & Munchies"],
      required: true,
    },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    unit: { type: String, required: true },
  },
  { timestamps: true }
);

const Grocery = mongoose.models.Grocery || mongoose.model<ItemsI>("Grocery", grocerySchema);
export default Grocery;