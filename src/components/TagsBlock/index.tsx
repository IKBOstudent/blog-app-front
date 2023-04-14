import React from "react";
import { Tag } from "@mui/icons-material";
import { Chip, Skeleton, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { TagContext } from "../../App";

import styles from "./TagsBlock.module.scss";

export const TagsBlock = ({ items, isLoading }: { items: string[]; isLoading: boolean }) => {
    const { sortTag, setSortTag } = useContext(TagContext);

    return (
        <div className={styles.root}>
            <div className={styles.list}>
                {(isLoading ? [...Array(7)] : items).map((name, i) => (
                    <div className={styles.tag} key={i}>
                        {!isLoading ? (
                            <Chip
                                icon={<Tag />}
                                color="secondary"
                                label={name}
                                variant={name === sortTag ? "filled" : "outlined"}
                                onClick={() => {
                                    setSortTag(sortTag !== name ? name : "");
                                }}
                            />
                        ) : (
                            <Skeleton variant="rectangular" width={90} height={32} style={{ borderRadius: "16px" }} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
