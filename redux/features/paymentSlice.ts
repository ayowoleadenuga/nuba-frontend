import { ContactState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type paymentSliceType = {
  autoPay: boolean;
  newPaymentMethod: {
    cardName: string;
    cardNo: string;
    cvv: string;
  };
};

const initialState: paymentSliceType = {
  autoPay: false,
  newPaymentMethod: {
    cardName: "",
    cardNo: "",
    cvv: "",
  },
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setAutoPay: (state, action: PayloadAction<boolean>) => {
      state.autoPay = action.payload;
    },
    updatePaymentMethod: (
      state,
      action: PayloadAction<paymentSliceType["newPaymentMethod"]>
    ) => {
      state.newPaymentMethod = { ...state.newPaymentMethod, ...action.payload };
    },
    resetNewPaymentForm: () => initialState,
  },
});

export const { setAutoPay, updatePaymentMethod, resetNewPaymentForm } =
  paymentSlice.actions;
export default paymentSlice.reducer;
