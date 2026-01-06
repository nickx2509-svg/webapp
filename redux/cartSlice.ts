import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import mongoose from "mongoose";
interface ItemsI {
  _id?: string;
  name: string;
  category: string;
  price: number;
  image: string;
  unit: string;
  quantity: number;
  createdAt?: string;
  updatedAt?: string;
}

interface CartSliceI {
  cartData: ItemsI[];
}
const initialState: CartSliceI = {
  cartData: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ItemsI>) => {
      state.cartData.push(action.payload);
    },
  },
});
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
