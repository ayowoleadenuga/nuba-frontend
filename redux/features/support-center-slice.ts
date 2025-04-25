import { ContactState } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  email: "",
  issue: "",
};

// export const supportCenterSlice = createSlice({
//   name: "supportCenterSlice",
//   initialState,
//   reducers: {
//     setField: <K extends keyof ContactState>(
//       state: ContactState,
//       action: PayloadAction<{ field: K; value: ContactState[K] }>
//     ) => {
//       state[action.payload.field] = action.payload.value;
//     },
//   },
// });
