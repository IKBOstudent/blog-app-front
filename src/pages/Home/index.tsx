import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { Button, Tab, Tabs, Typography } from "@mui/material";

import styles from "./Home.module.scss";

import { Post, TagsBlock } from "components";

import { TagContext } from "App";
import { fetchPosts, fetchPostsByTag } from "redux/slices/PostsSlice";
import { fetchTags } from "redux/slices/TagsSlice";
import { useAppDispatch, useAppSelector } from "hooks";
import { PostSkeleton } from "components/Post/PostSkeleton";

export const Home = () => {
    const dispatch = useAppDispatch();

    const posts = useAppSelector(state => state.PostsReducer);
    const tags = useAppSelector(state => state.TagsReducer);
    const userData = useAppSelector(state => state.AuthReducer.user);
    const isAuth = Boolean(userData);

    const { sortTag } = useContext(TagContext);

    const [sortType, setSortType] = useState("latest");

    const postsLoading = posts.status === "loading";
    const tagsLoading = tags.status === "loading";

    React.useEffect(() => {
        if (sortTag) {
            // search by tag
            dispatch(fetchPostsByTag(sortTag));
        } else {
            // search by sort type
            dispatch(fetchPosts(sortType));
            dispatch(fetchTags());
        }
    }, [sortType, sortTag]);

    return (
        <>
            {postsLoading || posts.items.length ? ( // sort tabs
                <Tabs className={styles.tabs} value={sortType === "latest" ? 0 : 1}>
                    <Tab onClick={() => setSortType("latest")} label="New" />
                    {!sortTag && <Tab onClick={() => setSortType("popular")} label="Popular" />}
                </Tabs>
            ) : null}

            {tagsLoading || posts.items.length ? ( // tags tabs
                <TagsBlock items={tags.items} isLoading={tagsLoading} />
            ) : null}

            <div>
                {postsLoading ? (
                    [...Array(3)].map((_, i) => <PostSkeleton isFullPost={false} />)
                ) : posts.items.length ? (
                    posts.items.map((post, i) => (
                        <Post
                            key={i}
                            _id={post._id}
                            author={post.author}
                            title={post.title}
                            imageUrl={post.imageUrl}
                            tags={post.tags}
                            viewsCount={post.viewsCount}
                            commentsCount={post.comments.length}
                            createdAt={post.createdAt}
                            isFullPost={true}
                            isEditable={userData?._id === post.author._id}
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
