import { Tag } from "@mui/icons-material";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { TagContext } from "../../App";

import styles from "./TagsBlock.module.scss";

export const TagsBlock = ({ items, isLoading }) => {
    const { sortTag, setSortTag } = useContext(TagContext);

    return (
        <div className={styles.root}>
            <Typography variant="h6" color="primary" classes={{ root: styles.title }}>
                Tags
            </Typography>
            <List>
                {(isLoading ? [...Array(3)] : items).map((name, i) => (
                    <div
                        className={styles.tag}
                        key={i}
                        onClick={() => {
                            setSortTag(sortTag !== name ? name : "");
                        }}
                    >
                        <ListItem selected={name === sortTag} disablePadding>
                            <ListItemButton>
                                <Tag color="secondary" style={{ marginRight: 20 }} />
                                {isLoading ? (
                                    <Skeleton width={100} style={{ margin: "4px 0" }} />
                                ) : (
                                    <ListItemText primary={name} />
                                )}
                            </ListItemButton>
                        </ListItem>
                    </div>
                ))}
            </List>
        </div>
    );
};
