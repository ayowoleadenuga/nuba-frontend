import { combineReducers, configureStore } from "@reduxjs/toolkit";
import contactReducer from "./features/contactSlice";

const rootReducer = combineReducers({
  contact: contactReducer,
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
