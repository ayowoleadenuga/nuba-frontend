import { SettingsState } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  email: "",
  phoneNumber: "",
  rentAddress: "",
  rentAmount: "",
  leaseDuration: "",
  landlordName: "",
  landlordbankDetails: "",
  preferredPaymnetMethod: "",
  rentDueDate: null,
  oldPassword: "",
  newPassword: "",
};

export const settingsSlice = createSlice({
  name: "settings-slice",
  initialState,
  reducers: {
    setSettingsField: <K extends keyof SettingsState>(
      state: SettingsState,
      action: PayloadAction<{ field: K; value: SettingsState[K] }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },
    resetSettingsForm: () => initialState,
  },
});

export const { setSettingsField, resetSettingsForm } = settingsSlice.actions;
export default settingsSlice.reducer;
