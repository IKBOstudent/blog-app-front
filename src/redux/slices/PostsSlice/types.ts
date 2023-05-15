import { IUser } from '../AuthSlice/types';
import { EStatus } from '../types.common';

export interface IComment {
    _id: string;
    user: IUser;
    text: string;
}

export interface IPost {
    _id: string;
    author: IUser;
    title: string;
    text: string;
    imageUrl: string;
    blurHash: string;
    tags: string[];
    viewsCount: number;
    comments: IComment[];
    createdAt: string;
}

export interface IPostsState {
    items: IPost[];
    status: EStatus;
}
