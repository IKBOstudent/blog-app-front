import React from "react";
import { useParams } from "react-router-dom";
import { CommentsBlock, AddComment, Post } from "../../components";
import axios from "../../axios";

import styles from "./FullPost.module.scss";

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const params = useParams();

  React.useEffect(() => {
    axios
      .get("posts/" + params.id)
      .then((res) => {
        setData(res.data.post);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Posts request failed");
      });
  }, [params.id]);

  if (isLoading) {
    return <Post isLoading />;
  }

  return (
    <>
      <Post
        className={styles.post}
        id={1}
        title={data.title}
        imageUrl={data.imageUrl}
        author={data.author}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <p>{data.text}</p>
      </Post>
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
      >
        <AddComment />
      </CommentsBlock>
    </>
  );
};
