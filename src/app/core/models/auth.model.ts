export interface IUser{
    _id:string;
    name:string;
    email:string;
    token?: string;
    profilepic:string;
}

export interface ILogin{
    email:string;
    password:string;
    
}


export interface IGoogleLogin{
    name:string;
    email:string;
    profilepic?:string;
}

export interface ILoginResponse{
    note: string;
    
    data: IUser
}
