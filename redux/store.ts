import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import contactReducer from "./features/contactSlice";
import signupReducer from "./features/authSlice";
import supportCenterReducer from "./features/support-center-slice";
import settingsReducer from "./features/settings-slice";
import paymentReducer from "./features/paymentSlice";
import { authApi } from "@/redux/features/authApiSlice";
import { userApi } from "@/redux/features/userApiSlice";
import { rentsApi } from "@/redux/features/rentsApiSlice";
import { paymentsApi } from "./features/paymentsApiSlice";
import { transactionsApi } from "./features/transactionsApiSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["signup"],
};

const rootReducer = combineReducers({
  contact: contactReducer,
  signup: signupReducer,
  supportCenter: supportCenterReducer,
  settings: settingsReducer,
  payment: paymentReducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [rentsApi.reducerPath]: rentsApi.reducer,
  [paymentsApi.reducerPath]: paymentsApi.reducer,
  [transactionsApi.reducerPath]: transactionsApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ["signup.formData.tenancyAgreement"],
      },
    }).concat(
      authApi.middleware,
      authApi.middleware,
      userApi.middleware,
      rentsApi.middleware,
      paymentsApi.middleware,
      transactionsApi.middleware
    ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
