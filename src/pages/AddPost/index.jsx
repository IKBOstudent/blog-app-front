import React from 'react';
import { Backdrop, Button, CircularProgress, Paper, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate, Navigate, useParams } from 'react-router-dom';
import axios from '../../axios';

import styles from './AddPost.module.scss';

export const AddPost = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [text, setText] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [tags, setTags] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');

    const [isLoading, setLoading] = React.useState(false);

    const [isChangingFile, setChangingFile] = React.useState(false);

    const inputFileRef = React.useRef();

    const handleChangeFile = async (event) => {
        try {
            setChangingFile(true);

            const formData = new FormData();
            const file = event.target.files[0];
            if (file) {
                formData.append('image', file);
                const { data } = await axios.post('/upload', formData);
                setImageUrl(String(process.env.REACT_APP_API_URL) + data.url);
            }

            setChangingFile(false);
        } catch (err) {
            console.warn(err);
            alert('here', err);
            setChangingFile(false);
        }
    };

    React.useEffect(() => {
        if (params.id) {
            axios
                .get(`/posts/post/${params.id}`)
                .then(({ data }) => {
                    setTitle(data.post.title);
                    setText(data.post.text);
                    setImageUrl(data.post.imageUrl);
                    setTags(data.post.tags.join(' '));
                })
                .catch((err) => {
                    console.warn('unable to post', err);
                    alert(err);
                });
        }
    }, []);

    const onSubmit = async () => {
        try {
            setLoading(true);

            const tagsArray = (tags + '').split(' ');

            const fields = {
                title,
                text,
                tags: tagsArray.filter((obj, i) => tagsArray.indexOf(obj) === i),
                imageUrl,
            };

            const { data } = params.id
                ? await axios.patch('/posts/' + params.id, fields)
                : await axios.post('/posts', fields);

            const id = params.id || data.post._id;
            navigate(`/posts/${id}`);
        } catch (err) {
            console.warn(err);
            alert(err);
            setLoading(false);
        }
    };

    return (
        <Paper className={styles.root}>
            <Backdrop
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isChangingFile || isLoading}>
                <CircularProgress color="secondary" />
            </Backdrop>
            <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
                Load image
            </Button>
            <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
            {imageUrl && (
                <>
                    <Button
                        style={{ marginLeft: 20 }}
                        variant="text"
                        color="secondary"
                        endIcon={<DeleteIcon />}
                        onClick={() => setImageUrl('')}>
                        Delete
                    </Button>
                    <img className={styles.image} src={imageUrl} alt="Uploaded" />
                </>
            )}

            <TextField
                classes={{ root: styles.title }}
                variant="standard"
                placeholder="Title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                fullWidth
            />
            <TextField
                classes={{ root: styles.tags }}
                variant="standard"
                placeholder="Tags"
                label="Add tags to your post"
                value={tags}
                onChange={(event) => setTags(event.target.value)}
                // fullWidth
            />
            <TextField
                classes={{ root: styles.description }}
                variant="filled"
                label="Description"
                placeholder="Enter description here..."
                multiline
                fullWidth
                value={text}
                onChange={(event) => setText(event.target.value)}
            />
            <div className={styles.buttons}>
                <Button onClick={onSubmit} size="large" variant="contained">
                    {params.id ? 'Save' : 'Publish'}
                </Button>
                <Link to="/" className={styles.button_cancel}>
                    <Button size="large">Cancel</Button>
                </Link>
            </div>
        </Paper>
    );
};
