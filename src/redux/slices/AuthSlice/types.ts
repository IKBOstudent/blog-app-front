import { EStatus } from "../types.common";

export interface IUser {
    _id: string;
    fullName: string;
    email: string;
    token?: string;
}

export interface IAuthState {
    user: IUser | null;
    status: EStatus;
}
