import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axiosConfig";
import { EStatus } from "../types.common";
import { ITagsState } from "./types";

export const fetchTags = createAsyncThunk<string[]>("tags/fetchTags", async () => {
    const { data } = await axios.get("/tags");
    return data.tags;
});

const initialState: ITagsState = {
    items: [],
    status: EStatus.LOADING,
};

const TagsSlice = createSlice({
    name: "tags",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchTags.pending, state => {
                state.status = EStatus.LOADING;
            })
            .addCase(fetchTags.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = EStatus.SUCCESS;
            })
            .addCase(fetchTags.rejected, state => {
                state.status = EStatus.ERROR;
            });
    },
});

export const TagsReducer = TagsSlice.reducer;
