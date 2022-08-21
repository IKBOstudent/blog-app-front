import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Tab, Tabs } from "@mui/material";

import styles from "./Home.module.scss";
import { CommentsBlock, Post, TagsBlock } from "../../components";
import { fetchPosts, fetchTags } from "../../redux/slices/PostsSlice";

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector((state) => state.PostsReducer);

  const postsLoading = posts.status === "loading";
  const tagsLoading = tags.status === "loading";

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, [dispatch]);

  return (
    <>
      <Tabs className={styles.tabs} value={0}>
        <Tab label="New" />
        <Tab label="Popular" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {postsLoading
            ? [1, 2, 3, 4].map((_, i) => <Post key={i} isLoading />)
            : posts.items.map((obj, i) => (
                <Post
                  key={i}
                  id={obj._id}
                  title={obj.title}
                  // imageUrl="https://images.unsplash.com/photo-1580327344181-c1163234e5a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80"
                  imageUrl={obj.imageUrl}
                  author={obj.author}
                  createdAt={obj.createdAt}
                  viewsCount={obj.viewsCount}
                  commentsCount={3}
                  tags={obj.tags}
                  isEditable
                />
              ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={tagsLoading} />
          <CommentsBlock
            items={[
              {
                author: {
                  fullName: "mark",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Test comment mark",
              },
              {
                author: {
                  fullName: "john",
                  avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                },
                text: "Test comment john",
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
