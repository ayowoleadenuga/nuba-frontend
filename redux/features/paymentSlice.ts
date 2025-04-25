import { ContactState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  autoPay: false,
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setAutoPay: (state, action: PayloadAction<boolean>) => {
      state.autoPay = action.payload;
    },
  },
});

export const { setAutoPay } = paymentSlice.actions;
export default paymentSlice.reducer;
