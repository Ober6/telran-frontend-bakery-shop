import {createSlice} from "@reduxjs/toolkit";
import type {AuthUserType} from "../../utils/app-types.ts";
import type {AppDispatch} from "../store";
import { setCart, resetCart } from "./cartSlice";
import { subscribeToCart } from "../../firebase/fireCartService";

let unsubscribeCart: (() => void) | null = null;

const initialState:{authUser: AuthUserType|null} = {authUser: null}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = {...action.payload}
    },
    resetAuthUser: state => {
      state.authUser = null
    }
  }
});

export const {setAuthUser, resetAuthUser} = authSlice.actions;
export const authReducer = authSlice.reducer;

export const loginUser = (user: AuthUserType) => (dispatch: AppDispatch) => {
  dispatch(setAuthUser(user));
  if (unsubscribeCart) unsubscribeCart();
  unsubscribeCart = subscribeToCart(user.uid, (items) => {
    dispatch(setCart(items));
  });
};

export const logoutUser = () => (dispatch: AppDispatch) => {
  dispatch(resetAuthUser());
  dispatch(resetCart());

  if (unsubscribeCart) {
    unsubscribeCart();
    unsubscribeCart = null;
  }
};

