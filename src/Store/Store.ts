import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "./Reducers/CryptoSlice";
import { cryptoApi } from "../Service/CryptoService";

export const store = configureStore({
  reducer: {
    cryptoReducer,
    [cryptoApi.reducerPath]: cryptoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
