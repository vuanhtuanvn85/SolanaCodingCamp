import { configureStore } from '@reduxjs/toolkit'

import walletReducer from './wallet.reducer'
import profiles from './profiles.reducer'

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    wallet: walletReducer,
    profiles,
  },
})

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
