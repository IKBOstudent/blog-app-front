import { configureStore } from "@reduxjs/toolkit";
import { PostsReducer } from "./slices/PostsSlice";
import { AuthReducer } from "./slices/AuthSlice";

const store = configureStore({
  reducer: {
    PostsReducer,
    AuthReducer,
  },
});

export default store;
