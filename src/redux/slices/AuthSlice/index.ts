import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axiosConfig";

import { IUser, IAuthState } from "./types";
import { EStatus } from "../types.common";

export const fetchAuthLogin = createAsyncThunk<
    IUser,
    {
        email: string;
        password: string;
    }
>("auth/fetchAuthLogin", async (params, { rejectWithValue }) => {
    try {
        const { data } = await axios.post<IUser>("api/auth/login", params);
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const fetchAuthRegister = createAsyncThunk<
    IUser,
    {
        fullName: string;
        email: string;
        password: string;
    }
>("auth/fetchAuthRegister", async (params, { rejectWithValue }) => {
    try {
        const { data } = await axios.post<IUser>("api/auth/register", params);
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const fetchAuthMe = createAsyncThunk<IUser>("auth/fetchAuthMe", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get<IUser>("api/auth/me");
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
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
            // login
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

            // register
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

            // check auth
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
