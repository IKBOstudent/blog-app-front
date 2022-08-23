import { Tag } from "@mui/icons-material";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton } from "@mui/material";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SideBlock } from "..";
import { TagContext } from "../../App";

import styles from "./TagsBlock.module.scss";

export const TagsBlock = ({ items, isLoading }) => {
  const { sortTag, setSortTag } = useContext(TagContext);

  return (
    <SideBlock className={styles.root} title="Tags">
      <List>
        {(isLoading ? [...Array(5)] : items).map((name, i) => (
          <div
            key={i}
            onClick={() => {
              setSortTag(sortTag !== name ? name : "");
            }}
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItem selected={name === sortTag} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Tag />
                </ListItemIcon>
                {isLoading ? <Skeleton width={100} /> : <ListItemText primary={name} />}
              </ListItemButton>
            </ListItem>
          </div>
        ))}
      </List>
    </SideBlock>
  );
};
