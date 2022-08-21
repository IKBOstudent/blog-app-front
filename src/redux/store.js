import { configureStore } from "@reduxjs/toolkit";
import { PostsReducer } from "./slices/PostsSlice";

const store = configureStore({
  reducer: {
    PostsReducer,
  },
});

export default store;
