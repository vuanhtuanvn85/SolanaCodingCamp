import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter.reducer";
import walletReducer from "./wallet.reducer";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    wallet: walletReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
