import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authUser: "",
        userData: {
            email: "",
            password: ""
        }
    },
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload
        },
        resetAuthUser: state => {
            state.authUser = ""
            state.userData = {
                email: "",
                password: ""
            }
        },
        setUserData: (state, action) => {
            state.userData = action.payload
        }
    }
});

export const {setAuthUser, resetAuthUser, setUserData} = authSlice.actions;
export const authReducer = authSlice.reducer;