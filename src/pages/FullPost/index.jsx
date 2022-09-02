import React from "react";
import { useParams } from "react-router-dom";
import { CommentsBlock, AddComment, Post } from "../../components";
import axios from "../../axios";

import styles from "./FullPost.module.scss";
import { useSelector } from "react-redux";

export const FullPost = () => {
  const [data, setData] = React.useState();
  const userData = useSelector((state) => state.AuthReducer.data);

  const [isLoading, setLoading] = React.useState(true);
  const params = useParams();

  const fetchPost = () => {
    axios
      .get("posts/post/" + params.id)
      .then((res) => {
        setData(res.data.post);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Posts request failed");
      });
  };

  React.useEffect(() => {
    fetchPost();
  }, [params.id]);

  if (isLoading) {
    return (
      <>
        <Post isLoading />
        <CommentsBlock isLoading={true} />
      </>
    );
  }
  return (
    <>
      <Post
        className={styles.post}
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
        <p>{data.text}</p>
      </Post>
      <CommentsBlock items={data.comments} isLoading={false}>
        <AddComment onNewComment={() => fetchPost()} />
      </CommentsBlock>
    </>
  );
};
