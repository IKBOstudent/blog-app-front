import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./slices/AuthSlice";
import { PostsReducer } from "./slices/PostsSlice";
import { TagsReducer } from "./slices/TagsSlice";

const store = configureStore({
    reducer: {
        AuthReducer,
        PostsReducer,
        TagsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
