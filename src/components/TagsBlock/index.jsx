import { Tag } from "@mui/icons-material";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Skeleton } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SideBlock } from "..";

import styles from "./TagsBlock.module.scss";

export const TagsBlock = ({ items, isLoading, onSetTag }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <SideBlock className={styles.root} title="Tags">
      <List>
        {(isLoading ? [...Array(5)] : items).map((name, i) => (
          <div
            key={i}
            onClick={() => {
              onSetTag(selectedIndex !== i ? name : "");
              setSelectedIndex(selectedIndex !== i ? i : -1);
            }}
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItem selected={i === selectedIndex} disablePadding>
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
