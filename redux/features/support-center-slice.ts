import { SupportCenterState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: SupportCenterState = {
  fullName: "",
  email: "",
  issue: "",
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
    resetForm: () => initialState,
  },
});

export const { setField, resetForm } = supportCenterSlice.actions;
export default supportCenterSlice.reducer;
