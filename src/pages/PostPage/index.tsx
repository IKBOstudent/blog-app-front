import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axiosConfig';

import { CommentsBlock, AddComment, Post } from 'components';

import { useAppSelector } from 'hooks';
import { PostSkeleton } from 'components/Post/PostSkeleton';
import { IPost } from 'redux/slices/PostsSlice/types';

export const PostPage = () => {
    const [isLoading, setLoading] = React.useState(true);
    const params = useParams();

    const [post, setPost] = React.useState<IPost | undefined>();
    const userData = useAppSelector((state) => state.AuthReducer.user);

    const fetchPost = async () => {
        try {
            const response = await axios.get('api/posts/post/' + params.id);
            setPost(response.data.post);
        } catch (error) {
            console.warn(error);
            alert('Posts request failed');
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchPost();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id]);

    if (isLoading) {
        return (
            <>
                <PostSkeleton isFullPost={true} />
                <CommentsBlock isLoading={true} />
            </>
        );
    }

    if (post) {
        return (
            <>
                <Post
                    _id={post._id}
                    author={post.author}
                    title={post.title}
                    imageUrl={post.imageUrl}
                    blurHash={post.blurHash}
                    tags={post.tags}
                    viewsCount={post.viewsCount}
                    commentsCount={post.comments.length}
                    createdAt={post.createdAt}
                    isFullPost={true}
                    isEditable={userData?._id === post.author._id}>
                    <p style={{ fontSize: '1.2rem' }}>{post.text}</p>
                </Post>
                <CommentsBlock isLoading={false} items={post.comments}>
                    <AddComment onNewComment={fetchPost} />
                </CommentsBlock>
            </>
        );
    }

    return null;
};
