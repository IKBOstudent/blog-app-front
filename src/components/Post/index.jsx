import {
  ChatBubbleOutlineOutlined,
  Delete,
  Edit,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { UserInfo } from "..";
import { fetchRemovePost } from "../../redux/slices/PostsSlice";

import styles from "./Post.module.scss";

import { PostSkeleton } from "./PostSkeleton";

export const Post = ({
  id,
  title,
  createdAt,
  imageUrl,
  author,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();

  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickRemove = () => {
    dispatch(fetchRemovePost(id));
  };

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <Edit />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <Delete />
          </IconButton>
        </div>
      )}
      {imageUrl &&
        (isFullPost ? (
          <img
            className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
            src={imageUrl}
            alt={title}
          />
        ) : (
          <Link to={`/posts/${id}`}>
            <img
              className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
              src={imageUrl}
              alt={title}
            />
          </Link>
        ))}
      <div className={styles.wrapper}>
        <UserInfo {...author} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2
            className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
          >
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
          <ul className={styles.tags}>
            {tags.map((name, i) => (
              <li key={i}>
                <Link to={`/tag/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <RemoveRedEyeOutlined />
              <span>{viewsCount}</span>
            </li>
            <li>
              <ChatBubbleOutlineOutlined />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
