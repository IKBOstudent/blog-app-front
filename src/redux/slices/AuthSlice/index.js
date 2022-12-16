import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../axios';

export const fetchAuthLogin = createAsyncThunk('auth/fetchAuthLogin', async (params) => {
    const response = await axios.post('/auth/login', params);
    return response.data;
});

export const fetchAuthRegister = createAsyncThunk('auth/fetchAuthLogin', async (params) => {
    const response = await axios.post('/auth/register', params);
    return response.data;
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const response = await axios.get('/auth/me');
    return response.data;
});

const initialState = {
    data: null,
    status: 'loading',
};

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
            state.status = 'error';
        },
    },
    extraReducers: {
        [fetchAuthLogin.pending]: (state) => {
            state.data = null;
            state.status = 'loading';
        },
        [fetchAuthLogin.fulfilled]: (state, action) => {
            state.status = 'success';
            state.data = action.payload;
        },
        [fetchAuthLogin.rejected]: (state, action) => {
            state.status = 'error';
            state.data = null;
        },

        [fetchAuthRegister.pending]: (state) => {
            state.data = null;
            state.status = 'loading';
        },
        [fetchAuthRegister.fulfilled]: (state, action) => {
            state.status = 'success';
            state.data = action.payload;
        },
        [fetchAuthRegister.rejected]: (state, action) => {
            state.status = 'error';
            state.data = null;
        },

        [fetchAuthMe.pending]: (state) => {
            state.data = null;
            state.status = 'loading';
        },
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.status = 'success';
            state.data = action.payload;
        },
        [fetchAuthMe.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
    },
});

export const { logout } = AuthSlice.actions;

export const AuthReducer = AuthSlice.reducer;
