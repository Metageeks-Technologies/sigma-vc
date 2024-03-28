import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type TInitialState = {
  loading: boolean;
  error: null | string;
  walletAddress: null | string;
  walletConnectedBy: string;
  isAuthenticated: boolean;
  isAdmin: boolean;
};

const initialState: TInitialState = {
  loading: false,
  error: null,
  walletAddress: null,
  walletConnectedBy: "",
  isAuthenticated: false,
  isAdmin: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setWalletAddress: (state, action: PayloadAction<null | string>) => {
      state.walletAddress = action.payload;
    },
    setWalletConnectedBy: (state, action: PayloadAction<string>) => {
      state.walletConnectedBy = action.payload;
    },
    setISAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setIsAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;
    },
  },
});

export const { setLoading, setError, setWalletAddress, setWalletConnectedBy, setISAuthenticated, setIsAdmin } =
  userSlice.actions;

export default userSlice.reducer;
