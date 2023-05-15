import React from "react";
import { IUser } from "redux/slices/AuthSlice/types";
import styles from "./UserInfo.module.scss";

export const UserInfo = ({ author, additionalText }: { author: IUser; additionalText: string }) => {
    const createdAt = new Date(additionalText);

    return (
        <div className={styles.root}>
            <img className={styles.avatar} src="/noavatar.png" alt={author.fullName} />
            <div className={styles.userDetails}>
                <span className={styles.userName}>{author.fullName}</span>
                <span className={styles.additional}>{createdAt.toDateString()}</span>
            </div>
        </div>
    );
};
