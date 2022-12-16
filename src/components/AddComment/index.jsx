import { Avatar, Button, CircularProgress, TextField } from '@mui/material';
import axios from '../../axios';
import React, { useState } from 'react';

import styles from './AddComment.module.scss';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export const AddComment = ({ onNewComment }) => {
    const [text, setText] = useState('');
    const { data } = useSelector((state) => state.AuthReducer);
    const params = useParams();

    const [isLoading, setLoading] = React.useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            if (text.trim()) {
                await axios.patch('/posts/' + params.id + '/comment', { newComment: text.trim() });
                setText('');
                onNewComment();
            }
        } catch (err) {
            console.warn(err);
            alert(err);
        } finally {
            setLoading(false);
        }
    };

    if (!data) {
        return <></>;
    }

    return (
        <>
            <div className={styles.root}>
                <Avatar classes={{ root: styles.avatar }} src={data.avatarUrl} />
                <form onSubmit={onSubmit} className={styles.form}>
                    <TextField
                        value={text}
                        onChange={(event) => setText(event.target.value)}
                        label="Write comment"
                        variant="outlined"
                        maxRows={10}
                        multiline
                        fullWidth
                    />
                    <Button
                        disabled={isLoading || text.trim().length === 0}
                        type="submit"
                        variant="contained">
                        Send
                        {isLoading && (
                            <CircularProgress color="secondary" className={styles.loader} />
                        )}
                    </Button>
                </form>
            </div>
        </>
    );
};
