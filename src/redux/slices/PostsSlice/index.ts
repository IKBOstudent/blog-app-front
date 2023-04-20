import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axiosConfig";

import { EStatus } from "../types.common";
import { IPost, IPostsState } from "./types";

export const fetchPosts = createAsyncThunk<IPost[], string>("posts/fetchPosts", async sortType => {
    const { data } = await axios.get("api/posts/" + sortType);
    return data.posts as IPost[];
});

export const fetchPostsByTag = createAsyncThunk<IPost[], string>("posts/fetchPostsByTag", async name => {
    const { data } = await axios.get("api/posts/tag/" + name);
    return data.posts as IPost[];
});

export const fetchRemovePost = createAsyncThunk<string, string>("posts/fetchRemovePost", async id => {
    await axios.delete("api/posts/" + id);
    return id;
});

const initialState: IPostsState = {
    items: [],
    status: EStatus.LOADING,
};

const PostsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            // get all
            .addCase(fetchPosts.pending, state => {
                state.status = EStatus.LOADING;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = EStatus.SUCCESS;
            })
            .addCase(fetchPosts.rejected, state => {
                state.status = EStatus.ERROR;
            })

            // get by tag
            .addCase(fetchPostsByTag.pending, state => {
                state.status = EStatus.LOADING;
            })
            .addCase(fetchPostsByTag.fulfilled, (state, action) => {
                state.status = EStatus.SUCCESS;
                state.items = action.payload;
            })
            .addCase(fetchPostsByTag.rejected, state => {
                state.status = EStatus.ERROR;
            })

            // remove
            .addCase(fetchRemovePost.pending, state => {
                state.status = EStatus.LOADING;
            })
            .addCase(fetchRemovePost.fulfilled, (state, action) => {
                state.items = state.items.filter(obj => obj._id !== action.payload);
                state.status = EStatus.SUCCESS;
            })
            .addCase(fetchRemovePost.rejected, state => {
                state.status = EStatus.ERROR;
            });
    },
});

export const PostsReducer = PostsSlice.reducer;
