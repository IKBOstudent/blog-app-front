import React from 'react';
import { Backdrop, Button, CircularProgress, Paper, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate, Navigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from '../../axios';

import styles from './AddPost.module.scss';

export const AddPost = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [imageUrl, setImageUrl] = React.useState('');

    const [isLoading, setLoading] = React.useState(false);

    const [isChangingFile, setChangingFile] = React.useState(false);

    const inputFileRef = React.useRef();

    const {
        register,
        handleSubmit,
        setValue,
        resetField,
        getValues,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            title: '',
            text: '',
            tags: '',
        },
        mode: 'onChange',
    });

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
        } catch (err) {
            console.warn(err);
            alert(err);
        } finally {
            setChangingFile(false);
        }
    };

    React.useEffect(() => {
        if (params.id) {
            setLoading(true);
            axios
                .get(`/posts/post/${params.id}`)
                .then(({ data }) => {
                    setValue('title', data.post.title);
                    setValue('text', data.post.text);
                    setValue('tags', data.post.tags.join(' '));
                    setImageUrl(data.post.imageUrl);
                })
                .catch((err) => {
                    console.warn('unable to post', err);
                    alert(err);
                })
                .finally(() => setLoading(false));
        }
    }, [params.id]);

    const onSubmit = async ({ title, text, tags }) => {
        try {
            setLoading(true);
            console.log({ title, text, tags });

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
            resetField('title');
            resetField('text');
            resetField('tags');
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

            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    InputLabelProps={{ shrink: true }}
                    classes={{ root: styles.title }}
                    variant="standard"
                    placeholder="Title"
                    error={Boolean(errors.title?.message)}
                    helperText={errors.title?.message}
                    fullWidth
                    {...register('title', {
                        required: 'Title required',
                    })}
                />
                <TextField
                    InputLabelProps={{ shrink: true }}
                    classes={{ root: styles.tags }}
                    variant="standard"
                    placeholder="Tags"
                    label="Add tags to your post"
                    error={Boolean(errors.tags?.message)}
                    helperText={errors.tags?.message}
                    {...register('tags', {
                        validate: (value) =>
                            value.split(' ').filter((item) => item.length > 12).length === 0 ||
                            'Too long tag name',
                    })}
                />
                <TextField
                    InputLabelProps={{ shrink: true }}
                    classes={{ root: styles.description }}
                    variant="filled"
                    label="Description"
                    placeholder="Enter description here..."
                    multiline
                    fullWidth
                    error={Boolean(errors.text?.message)}
                    helperText={errors.text?.message}
                    {...register('text', {
                        required: 'Description required',
                    })}
                />
                <div className={styles.buttons}>
                    <Button disabled={!isValid} type="submit" size="large" variant="contained">
                        {params.id ? 'Save' : 'Publish'}
                    </Button>
                    <Link to="/" className={styles.button_cancel}>
                        <Button size="large">Cancel</Button>
                    </Link>
                </div>
            </form>
        </Paper>
    );
};
