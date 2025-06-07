import { SupportCenterState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: SupportCenterState = {
  subject: "",
  message: "",
  name: "",
  email: "",
};

export const supportCenterSlice = createSlice({
  name: "supportCenterSlice",
  initialState,
  reducers: {
    setField: <K extends keyof SupportCenterState>(
      state: SupportCenterState,
      action: PayloadAction<{ field: K; value: SupportCenterState[K] }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },
    resetSupportForm: () => initialState,
  },
});

export const { setField, resetSupportForm } = supportCenterSlice.actions;
export default supportCenterSlice.reducer;
