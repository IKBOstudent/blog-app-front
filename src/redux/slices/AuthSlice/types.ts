export enum EStatus {
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error",
}

export interface IUser {
    _id: string;
    fullname: string;
    email: string;
    token?: string;
}

export interface IAuthState {
    user: IUser | null;
    status: EStatus;
}
