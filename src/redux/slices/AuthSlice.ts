import { createSlice } from "@reduxjs/toolkit";
import type { AuthUser } from "../../utils/app-types";
import type { PayloadAction } from "@reduxjs/toolkit"

type AuthState = {
  authUser: AuthUser | null;
};

const initialState: AuthState = {
  authUser: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<AuthUser>) => {
      state.authUser = action.payload;
    },
    resetAuthUser: (state) => {
      state.authUser = null;
    }
  }
});

export const { setAuthUser, resetAuthUser } = authSlice.actions;
export const authReducer = authSlice.reducer;