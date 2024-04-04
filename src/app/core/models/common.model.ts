import { IUser } from "./auth.model";

export interface IApiResponse<T>{
    note: string;
    data: T;
}
export interface IUserResponse<T>{
    note: string;
    data: T;
}

export interface INotes{
    _id?: string;
    user: IUser;
    title: string;
    body: string;
    status?: number;
    createdAt?: string;

}
export interface ITask{
    _id?: string;
    user: IUser;
    title: string;
    status?: number;
    completed:boolean;
    createdAt?: string;

}
export interface Itaskprogress{
    completed:boolean
}
export interface INote{
    
    title:string;
    body:string;
}
export interface userid{
    user:string
}
export interface INoteResponse{
    note: string;
    
    data: IUser
}
