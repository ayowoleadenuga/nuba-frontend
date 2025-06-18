import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type paymentSliceType = {
  autoPay: boolean;
  newPaymentMethod: {
    country: string;
    postcode: string;
    city: string;
    address: string;
    address_2: string;
    state: string;
    cardName: string;
    cardNumber: string;
    cvc: string;
    mmYY: string;
  };
  makePayment: "" | "start" | "complete" | "ryft";
  rentPaymentStatus: "success" | "" | "error";
};

const initialState: paymentSliceType = {
  autoPay: false,
  newPaymentMethod: {
    country: "",
    postcode: "",
    city: "",
    address: "",
    address_2: "",
    state: "",
    cardName: "",
    cardNumber: "",
    cvc: "",
    mmYY: "",
  },
  makePayment: "",
  rentPaymentStatus: "",
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
    setMakePayment: (
      state,
      action: PayloadAction<"" | "start" | "complete" | "ryft">
    ) => {
      state.makePayment = action.payload;
    },
    setRentPaymentStatus: (
      state,
      action: PayloadAction<"" | "success" | "error">
    ) => {
      state.rentPaymentStatus = action.payload;
    },
  },
});

export const {
  setAutoPay,
  updatePaymentMethod,
  resetNewPaymentForm,
  setMakePayment,
  setRentPaymentStatus,
} = paymentSlice.actions;
export default paymentSlice.reducer;
