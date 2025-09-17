import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./slices/AuthSlice.ts";
import {prodsReducer} from "./slices/productSlice.ts";
import {cartReducer} from "./slices/cartSlice.ts";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        products: prodsReducer,
        cart: cartReducer
    }
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch