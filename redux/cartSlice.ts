import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ItemsI {
  _id: string;
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
  subTotal: number;
  deliveryFee: number;
  finalTotal: number;
}

const initialState: CartSliceI = {
  cartData: [],
  subTotal: 0,
  deliveryFee: 40,
  finalTotal: 40,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ADD ITEM (first time)
    addToCart: (state, action: PayloadAction<ItemsI>) => {
      state.cartData.push(action.payload);
      cartSlice.caseReducers.calculateTotal(state);
    },

    // INCREASE quantity by 1
    increaseQty: (state, action: PayloadAction<string>) => {
      const item = state.cartData.find((i) => i._id === action.payload);
      if (item) item.quantity += 1;
      cartSlice.caseReducers.calculateTotal(state);
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
      cartSlice.caseReducers.calculateTotal(state);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartData = state.cartData.filter((i) => i._id !== action.payload);
      cartSlice.caseReducers.calculateTotal(state);
    },
    calculateTotal: (state) => {
      state.subTotal = state.cartData.reduce(
        (sum, item) => sum + Number(item.price) * item.quantity,
        0
      );
      state.deliveryFee = state.subTotal > 100 ? 0 : 40;
      state.finalTotal = state.subTotal + state.deliveryFee;
    },
  },
});

export const {
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
  calculateTotal,
} = cartSlice.actions;
export default cartSlice.reducer;
