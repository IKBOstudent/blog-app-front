import React from 'react';
import { Skeleton, Stack } from '@mui/material';

import styles from './PostSkeleton.module.scss';

export const PostSkeleton = () => {
    return (
        <div className={styles.skeleton}>
            <Stack>
                <Skeleton variant="rectangular" height={240} />
                <div className={styles.skeletonContent}>
                    <div className={styles.skeletonUser}>
                        <Skeleton
                            variant="circular"
                            width={30}
                            height={30}
                            style={{ marginRight: 10 }}
                        />
                        <div className={styles.skeletonUserDetails}>
                            <Skeleton variant="text" width={60} height={20} />
                            <Skeleton variant="text" width={100} height={15} />
                        </div>
                    </div>
                    <div className={styles.skeletonInfo}>
                        <Skeleton variant="text" height={45} />
                        <div className={styles.skeletonTags}>
                            <Skeleton variant="text" width={40} height={30} />
                            <Skeleton variant="text" width={40} height={30} />
                            <Skeleton variant="text" width={40} height={30} />
                        </div>
                        <div className={styles.skeletonTags}>
                            <Skeleton variant="text" width={60} height={30} />
                            <Skeleton variant="text" width={60} height={30} />
                        </div>
                    </div>
                </div>
            </Stack>
        </div>
    );
};
