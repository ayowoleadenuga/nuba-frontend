import { newRentPayload } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface newRentState {
  formData: newRentPayload;
  currentRentId: string;
}

const initialState: newRentState = {
  formData: {
    country: "",
    startDate: "",
    endDate: "",
    address: "",
    rentFrequency: "",
    monthlyPrice: "",
    landlordAccountNumber: "",
    landlordAccountName: "",
    landlordSortCode: "",
    landlordEmail: "",
  },
  currentRentId: "",
};

const rentSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    updateFormData: (
      state,
      action: PayloadAction<Partial<newRentState["formData"]>>
    ) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetSignup: () => initialState,

    setCurrentRentId: (state, action: PayloadAction<string>) => {
      state.currentRentId = action.payload;
    },
  },
});

export const { updateFormData, resetSignup, setCurrentRentId } =
  rentSlice.actions;
export default rentSlice.reducer;
