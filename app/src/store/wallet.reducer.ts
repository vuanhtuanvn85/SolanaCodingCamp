import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type WalletState = {
  walletAddress: string;
  balance: number;
  tokenBalance: number;
}

const initialState: WalletState = {
  walletAddress: "",
  balance: 0,
  tokenBalance: 0,
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWalletInfo: (state, action: PayloadAction<WalletState>) => {
      state.walletAddress = action.payload.walletAddress;
      state.balance = action.payload.balance;
      state.tokenBalance = action.payload.tokenBalance;
    }
  }
});

export const { setWalletInfo } = walletSlice.actions;

export default walletSlice.reducer;
