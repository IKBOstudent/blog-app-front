import { EStatus, IUser } from "../AuthSlice/types";

export interface IComment {
    _id: string;
    user: string;
    text: string;
}

export interface IPost {
    _id: string;
    author: IUser;
    title: string;
    text: string;
    imageUrl: string;
    tags: string[];
    viewscount: number;
    comments: IComment[];
    createdAt: string;
}

export interface IPostsState {
    items: IPost[];
    status: EStatus;
}
