import { Tag } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { SideBlock } from "..";

import styles from "./TagsBlock.module.scss";

export const TagsBlock = ({ items, isLoading }) => {
  return (
    <SideBlock className={styles.root} title="Tags">
      <List>
        {(isLoading ? [...Array(5)] : items).map((name, i) => (
          <Link
            key={i}
            to={`/tags/${name}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItem key={i} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Tag />
                </ListItemIcon>
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <ListItemText primary={name} />
                )}
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </SideBlock>
  );
};
