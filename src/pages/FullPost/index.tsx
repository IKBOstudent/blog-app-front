import React from "react";
import { useParams } from "react-router-dom";
import axios from "axiosConfig";

import { CommentsBlock, AddComment, Post } from "components";

import styles from "./FullPost.module.scss";
import { useAppSelector } from "hooks";

export const FullPost = () => {
    const [data, setData] = React.useState();
    const userData = useAppSelector(state => state.AuthReducer.data);

    const [isLoading, setLoading] = React.useState(true);
    const params = useParams();

    const fetchPost = async () => {
        try {
            const response = await axios.get("posts/post/" + params.id);
            setData(response.data.post);
        } catch (error) {
            console.warn(error);
            alert("Posts request failed");
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchPost();
    }, [params.id]);

    return isLoading ? (
        <>
            <Post isLoading />
            <CommentsBlock isLoading={true} />
        </>
    ) : (
        <>
            <Post
                id={data._id}
                title={data.title}
                imageUrl={data.imageUrl}
                author={data.author}
                createdAt={data.createdAt}
                viewsCount={data.viewsCount}
                commentsCount={data.comments.length}
                tags={data.tags}
                isFullPost
                isEditable={userData?._id === data.author._id}
            >
                <p style={{ fontSize: "1.2rem" }}>{data.text}</p>
            </Post>
            <CommentsBlock items={data.comments} isLoading={false}>
                <AddComment onNewComment={fetchPost} />
            </CommentsBlock>
        </>
    );
};
