import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authUser: ""
    },
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload
        },
        resetAuthUser: state => {
            state.authUser = ""
        }
    }
});

export const {setAuthUser, resetAuthUser} = authSlice.actions;
export const authReducer = authSlice.reducer;