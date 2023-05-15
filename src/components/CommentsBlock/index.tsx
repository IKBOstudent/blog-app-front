import React from 'react';
import { Avatar, Divider, List, ListItem, ListItemAvatar, Typography } from '@mui/material';

import styles from './CommentsBlock.module.scss';
import { IComment } from 'redux/slices/PostsSlice/types';
import CommentsSkeleton from './CommentsSkeleton';

interface CommentsProps {
    isLoading: boolean;

    items?: IComment[];
    children?: JSX.Element;
}

export const CommentsBlock = ({ isLoading, items, children }: CommentsProps) => {
    return (
        <div className={styles.root}>
            <Typography variant="h6" classes={{ root: styles.title }}>
                Comments
            </Typography>
            <List>
                {isLoading ? (
                    <CommentsSkeleton />
                ) : (
                    items?.map((comment, i) => (
                        <React.Fragment key={i}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar alt={comment.user.fullName} src="/noavatar.png" />
                                </ListItemAvatar>

                                <div className={styles.commentText}>
                                    <h5>{comment.user.fullName}</h5>
                                    <h3>{comment.text}</h3>
                                </div>
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </React.Fragment>
                    ))
                )}
            </List>
            {children}
        </div>
    );
};
