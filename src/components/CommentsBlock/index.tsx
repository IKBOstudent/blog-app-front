import React from "react";
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Skeleton, Typography } from "@mui/material";

import styles from "./CommentsBlock.module.scss";

export const CommentsBlock = ({ items, isLoading, children }) => {
    return (
        <div className={styles.root}>
            <Typography variant="h6" classes={{ root: styles.title }}>
                Comments
            </Typography>
            <List>
                {(isLoading ? [...Array(3)] : items).map((obj, index) => (
                    <React.Fragment key={index}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                {isLoading ? (
                                    <Skeleton variant="circular" width={40} height={40} />
                                ) : (
                                    <Avatar alt={obj.user.fullName} src={obj.user.avatarUrl} />
                                )}
                            </ListItemAvatar>
                            {isLoading ? (
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <Skeleton variant="text" height={25} width={120} />
                                    <Skeleton variant="text" height={18} width={230} />
                                </div>
                            ) : (
                                <div className={styles.commentText}>
                                    <h5>{obj.user.fullName}</h5>
                                    <h3>{obj.text}</h3>
                                </div>
                            )}
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </React.Fragment>
                ))}
            </List>
            {children}
        </div>
    );
};
