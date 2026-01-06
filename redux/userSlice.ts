import { createSlice } from "@reduxjs/toolkit";
import mongoose, { Document } from "mongoose";

interface UserI extends Document {
  name: string;
  email: string;
  password?: string;
  mobile?: string;
  role: "user" | "deliveryBoy" | "admin";
  image?: string;
}

interface UserSliceI {
  userData: UserI | null;
}

const initialState: UserSliceI = {
  userData: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});
export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
