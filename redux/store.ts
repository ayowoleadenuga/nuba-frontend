import { combineReducers, configureStore } from "@reduxjs/toolkit";
import contactReducer from "./features/contactSlice";
import signupReducer from "./features/authSlice";
const rootReducer = combineReducers({
  contact: contactReducer,
  signup: signupReducer,
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
