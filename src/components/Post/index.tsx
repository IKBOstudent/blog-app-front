import React from "react";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";

import { ChatBubbleOutlineOutlined, Delete, Edit, RemoveRedEyeOutlined } from "@mui/icons-material";
import { Button, Paper, Dialog, DialogContent, DialogActions } from "@mui/material";

import { useAppDispatch } from "hooks";

import { UserInfo } from "..";
import { TagContext } from "App";
import { fetchRemovePost } from "redux/slices/PostsSlice";

import styles from "./Post.module.scss";

import { IUser } from "redux/slices/AuthSlice/types";

export interface PostProps {
    _id: string;
    author: IUser;
    title: string;
    imageUrl: string;
    tags: string[];
    viewsCount: number;
    commentsCount: number;
    createdAt: string;

    isFullPost: boolean;
    isEditable: boolean;

    children?: JSX.Element | string;
}

export const Post = ({
    _id,
    author,
    title,
    imageUrl,
    tags,
    viewsCount,
    commentsCount,
    createdAt,
    isFullPost,
    isEditable,
    children,
}: PostProps) => {
    const dispatch = useAppDispatch();
    const { setSortTag } = React.useContext(TagContext);

    const navigate = useNavigate();

    const [isOpenModal, setOpenModal] = React.useState(false);
    const onClickRemove = async () => {
        try {
            await dispatch(fetchRemovePost(_id));

            setOpenModal(false);
            navigate("/");
        } catch (err) {
            console.warn(err);
            alert(err);
        }
    };

    const DeletePostModal = () => {
        return (
            <Dialog open={isOpenModal} onClose={() => setOpenModal(false)}>
                <DialogContent>Are you sure you want to remove this post?</DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={() => setOpenModal(false)} autoFocus>
                        CANCEL
                    </Button>
                    <Button variant="contained" color="primary" onClick={onClickRemove}>
                        REMOVE
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    const EditButtons = () => {
        return (
            <Paper elevation={8} classes={{ root: styles.editButtons }}>
                <Link to={`/posts/${_id}/edit`}>
                    <Button>
                        <Edit color="primary" />
                    </Button>
                </Link>
                <Button onClick={() => setOpenModal(true)}>
                    <Delete color="secondary" />
                </Button>
            </Paper>
        );
    };

    const PostImage = () => {
        return (
            <Link to={`/posts/${_id}`} style={isFullPost ? { pointerEvents: "none" } : undefined}>
                <img
                    height={isFullPost ? undefined : 240}
                    className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
                    src={imageUrl}
                    alt={title}
                />
            </Link>
        );
    };

    return (
        <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
            <DeletePostModal />

            {isEditable ? <EditButtons /> : null}

            {imageUrl ? <PostImage /> : null}

            <div className={styles.wrapper}>
                <UserInfo author={author} additionalText={createdAt} />

                <div className={styles.indention}>
                    <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
                        {isFullPost ? title : <Link to={`/posts/${_id}`}>{title}</Link>}
                    </h2>

                    <ul className={styles.tags}>
                        {tags.map((name, i) => (
                            <li key={i}>
                                <div className={styles.tag} onClick={() => setSortTag(name)}>
                                    #{name}
                                </div>
                            </li>
                        ))}
                    </ul>

                    {children ? <div className={styles.content}>{children}</div> : null}

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
