import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../axios";

export const fetchAuthLogin = createAsyncThunk(
  "auth/fetchAuthLogin",
  async (params) => {
    const response = await axios.post("/auth/login", params);
    return response;
  }
);

export const fetchAuthRegister = createAsyncThunk(
  "auth/fetchAuthLogin",
  async (params) => {
    const response = await axios.post("/auth/register", params);
    return response;
  }
);

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const response = await axios.get("/auth/me");
  return response;
});

const initialState = {
  data: null,
  status: "loading",
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.status = "loading";
    },
  },
  extraReducers: {
    [fetchAuthLogin.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchAuthLogin.fulfilled]: (state, action) => {
      state.status = "success";
      state.data = action.payload.data;
    },
    [fetchAuthLogin.rejected]: (state, action) => {
      state.status = "error";
      state.data = null;
    },

    [fetchAuthRegister.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchAuthRegister.fulfilled]: (state, action) => {
      state.status = "success";
      state.data = action.payload.data;
    },
    [fetchAuthRegister.rejected]: (state, action) => {
      state.status = "error";
      state.data = null;
    },

    [fetchAuthMe.pending]: (state) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.status = "success";
      state.data = action.payload.data;
    },
    [fetchAuthMe.rejected]: (state) => {
      state.status = "error";
      state.data = null;
    },
  },
});

export const { logout } = AuthSlice.actions;

export const AuthReducer = AuthSlice.reducer;
