import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axiosConfig";

import { EStatus, IUser, IAuthState } from "./types";

export const fetchAuthLogin = createAsyncThunk<IUser, string>("auth/fetchAuthLogin", async params => {
    const response = await axios.post("/auth/login", params);
    return response.data as IUser;
});

export const fetchAuthRegister = createAsyncThunk<IUser, string>("auth/fetchAuthLogin", async params => {
    const response = await axios.post("/auth/register", params);
    return response.data as IUser;
});

export const fetchAuthMe = createAsyncThunk<IUser>("auth/fetchAuthMe", async () => {
    const response = await axios.get("/auth/me");
    return response.data as IUser;
});

const initialState: IAuthState = {
    user: null,
    status: EStatus.LOADING,
};

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: state => {
            state.user = null;
            state.status = EStatus.ERROR;
        },
    },
    extraReducers: builder => {
        builder
            // get all
            .addCase(fetchAuthLogin.pending, state => {
                state.status = EStatus.LOADING;
            })
            .addCase(fetchAuthLogin.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status = EStatus.SUCCESS;
            })
            .addCase(fetchAuthLogin.rejected, state => {
                state.status = EStatus.ERROR;
            })

            // get by tag
            .addCase(fetchAuthRegister.pending, state => {
                state.status = EStatus.LOADING;
            })
            .addCase(fetchAuthRegister.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status = EStatus.SUCCESS;
            })
            .addCase(fetchAuthRegister.rejected, state => {
                state.status = EStatus.ERROR;
            })

            // remove
            .addCase(fetchAuthMe.pending, state => {
                state.status = EStatus.LOADING;
            })
            .addCase(fetchAuthMe.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status = EStatus.SUCCESS;
            })
            .addCase(fetchAuthMe.rejected, state => {
                state.status = EStatus.ERROR;
            });
    },
});

export const { logout } = AuthSlice.actions;

export const AuthReducer = AuthSlice.reducer;