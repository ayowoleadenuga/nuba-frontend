import { combineReducers, configureStore } from "@reduxjs/toolkit";
import contactReducer from "./features/contactSlice";
import signupReducer from "./features/authSlice";
import supportCenterReduer from "./features/support-center-slice";
import settingsReduer from "./features/settings-slice";
import paymentReducer from "./features/paymentSlice";

const rootReducer = combineReducers({
  contact: contactReducer,
  signup: signupReducer,
  supportCenter: supportCenterReduer,
  settings: settingsReduer,
  payment: paymentReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
