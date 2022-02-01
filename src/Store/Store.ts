import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "./Reducers/CryptoSlice";
import graphReducer from "./Reducers/ActiveCryptoAndGraphSlice";
import { cryptoApi } from "../Service/CryptoService";

export const store = configureStore({
  reducer: {
    cryptoReducer,
    graphReducer,
    [cryptoApi.reducerPath]: cryptoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
