import { ChatBubbleOutlineOutlined, Delete, Edit, RemoveRedEyeOutlined } from '@mui/icons-material';
import { ButtonGroup, Button, Paper, Dialog, DialogContent, DialogActions } from '@mui/material';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { UserInfo } from '..';
import { TagContext } from '../../App';
import { fetchRemovePost } from '../../redux/slices/PostsSlice';

import styles from './Post.module.scss';

import { PostSkeleton } from './PostSkeleton';

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
    const { setSortTag } = useContext(TagContext);

    const navigate = useNavigate();

    const [isOpenModal, setOpenModal] = React.useState(false);
    const onClickRemove = async () => {
        try {
            await dispatch(fetchRemovePost(id));

            setOpenModal(false);
            navigate('/');
        } catch (err) {
            console.warn(err);
            alert(err);
        }
    };

    if (isLoading) {
        return <PostSkeleton isFullPost={true} />;
    }

    return (
        <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
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

            {isEditable && (
                <Paper elevation={8} classes={{ root: styles.editButtons }}>
                    <Link to={`/posts/${id}/edit`}>
                        <Button>
                            <Edit color="primary" />
                        </Button>
                    </Link>
                    <Button onClick={() => setOpenModal(true)}>
                        <Delete color="secondary" />
                    </Button>
                </Paper>
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
                            height={240}
                            className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
                            src={imageUrl}
                            alt={title}
                        />
                    </Link>
                ))}
            <div className={styles.wrapper}>
                <UserInfo {...author} additionalText={createdAt} />
                <div className={styles.indention}>
                    <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
                        {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
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
