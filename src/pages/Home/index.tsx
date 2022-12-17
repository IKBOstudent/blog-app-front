import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { Button, Tab, Tabs, Typography } from "@mui/material";

import styles from "./Home.module.scss";

import { Post, TagsBlock } from "components";

import { TagContext } from "App";
import { fetchPosts, fetchPostsByTag, fetchTags } from "redux/slices/PostsSlice";
import { useAppDispatch, useAppSelector } from "hooks";

export const Home = () => {
    const dispatch = useAppDispatch();

    const { posts, tags } = useAppSelector(state => state.PostsReducer);
    const userData = useAppSelector(state => state.AuthReducer.data);
    const isAuth = Boolean(userData);

    const { sortTag } = useContext(TagContext);

    const [sortType, setSortType] = useState("latest");

    const postsLoading = posts.status === "loading";
    const tagsLoading = tags.status === "loading";

    React.useEffect(() => {
        if (sortTag) {
            setSortType("latest");
            dispatch(fetchPostsByTag(sortTag));
        } else {
            dispatch(fetchPosts(sortType));
            dispatch(fetchTags());
        }
    }, [sortType, sortTag]);

    return (
        <>
            {postsLoading || posts.items.length ? (
                <Tabs className={styles.tabs} value={sortType === "latest" ? 0 : 1}>
                    <Tab onClick={() => setSortType("latest")} label="New" />
                    {!sortTag && <Tab onClick={() => setSortType("popular")} label="Popular" />}
                </Tabs>
            ) : null}

            {tagsLoading || posts.items.length > 0 ? <TagsBlock items={tags.items} isLoading={tagsLoading} /> : null}

            <div>
                {postsLoading ? (
                    [1, 2].map((_, i) => <Post key={i} isLoading />)
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
                        <Typography variant="h5" style={{ color: "#ffffff", fontWeight: 700 }}>
                            No posts yet
                        </Typography>
                        {isAuth && (
                            <Link to="/add-post">
                                <Button size="large" variant="contained">
                                    Create new
                                </Button>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};
