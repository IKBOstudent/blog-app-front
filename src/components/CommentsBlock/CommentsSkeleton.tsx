import { Divider, ListItem, ListItemAvatar, Skeleton } from "@mui/material";
import React from "react";

function CommentsSkeleton() {
    return (
        <>
            {[...Array(3)].map((_, i) => (
                <React.Fragment key={i}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Skeleton variant="circular" width={40} height={40} />
                        </ListItemAvatar>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Skeleton variant="text" height={25} width={120} />
                            <Skeleton variant="text" height={18} width={230} />
                        </div>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </React.Fragment>
            ))}
        </>
    );
}

export default CommentsSkeleton;
