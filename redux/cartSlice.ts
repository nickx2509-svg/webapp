import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    // ADD ITEM (first time)
    addToCart: (state, action: PayloadAction<ItemsI>) => {
      state.cartData.push(action.payload);
    },

    // INCREASE quantity by 1
    increaseQty: (state, action: PayloadAction<string>) => {
      const item = state.cartData.find((i) => i._id === action.payload);
      if (item) item.quantity += 1;
    },

    // DECREASE quantity by 1 (remove if 0)
    decreaseQty: (state, action: PayloadAction<string>) => {
      const item = state.cartData.find((i) => i._id === action.payload);
      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cartData = state.cartData.filter((i) => i._id !== action.payload);
      }
    },
  },
});

export const { addToCart, increaseQty, decreaseQty } = cartSlice.actions;
export default cartSlice.reducer;
