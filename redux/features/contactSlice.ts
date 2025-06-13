import { ContactState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ContactState = {
  fullName: "",
  phoneNumber: "",
  email: "",
  subject: "",
  message: "",
  loading: false,
  error: null,
  success: false,
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setField: <K extends keyof ContactState>(
      state: ContactState,
      action: PayloadAction<{ field: K; value: ContactState[K] }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },
    resetContactUsForm: () => initialState,
  },
});

export const { setField, resetContactUsForm } = contactSlice.actions;
export default contactSlice.reducer;
