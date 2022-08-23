import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Tab, Tabs } from "@mui/material";

import styles from "./Home.module.scss";
import { Post, TagsBlock } from "../../components";
import { fetchPosts, fetchPostsByTag, fetchTags } from "../../redux/slices/PostsSlice";
import { TagContext } from "../../App";
import { Link } from "react-router-dom";

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.AuthReducer.data);
  const { posts, tags } = useSelector((state) => state.PostsReducer);

  const [sortType, setSortType] = useState("latest");
  const { sortTag } = useContext(TagContext);

  const postsLoading = posts.status === "loading";
  const tagsLoading = tags.status === "loading";

  React.useEffect(() => {
    if (sortTag) {
      dispatch(fetchPostsByTag(sortTag));
    } else {
      dispatch(fetchPosts(sortType));
      dispatch(fetchTags());
    }
  }, [sortType, sortTag]);

  return (
    <>
      {!tagsLoading && posts.items.length > 0 && !sortTag ? (
        <Tabs className={styles.tabs} value={sortType === "latest" ? 0 : 1}>
          <Tab onClick={() => setSortType("latest")} label="New" />
          <Tab onClick={() => setSortType("popular")} label="Popular" />
        </Tabs>
      ) : (
        <></>
      )}
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {postsLoading ? (
            [1, 2, 3, 4].map((_, i) => <Post key={i} isLoading />)
          ) : posts.items.length ? (
            posts.items.map((obj, i) => (
              <Post
                key={i}
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl}
                author={obj.author}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={obj.comments.length}
                tags={obj.tags}
                isEditable={userData?._id === obj.author._id}
              />
            ))
          ) : (
            <div className={styles.noPosts}>
              <h2>No posts yet</h2>
              {userData && (
                <Link to="/add-post">
                  <Button size="large" variant="contained">
                    Create new
                  </Button>
                </Link>
              )}
            </div>
          )}
        </Grid>
        <Grid xs={4} item>
          {!tagsLoading && posts.items.length > 0 && <TagsBlock items={tags.items} isLoading={tagsLoading} />}
        </Grid>
      </Grid>
    </>
  );
};
