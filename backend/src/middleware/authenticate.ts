import { sign, verify } from "jsonwebtoken"
import { IUser } from "../models/common.model"
import { NextFunction, Request, Response } from "express";
import { UserModel } from "../db/users";
import { merge } from "lodash";

const SECRET_KEY = 'bsaffyu6848sdsad8498ghbdauygayfbgafoag387g6t6rq7'
export const generateToken = (data:IUser)=>{
    const token =sign(data,SECRET_KEY ,{
        expiresIn: '1 day'
    });
    return token;
}

export const validateUser= async(request: Request,
    response: Response, next: NextFunction)=>{
        const authorization = request.headers.authorization;

        if(authorization){
            const splittedToken= authorization.split(' ');
            try {
                const token = splittedToken[1];
                const user: IUser = await verify(token, SECRET_KEY) as IUser;
                const isValidToken = await isTokenValid(user.email,token);
                if(user && isValidToken){
                    merge(request, { user });
                    return next();
                }
            } catch (error) {
                return response.status(401).json({status:false,messsage:'Unauthorized'})

            }
        }
        return response.status(401).json({status:false,messsage:'Unauthorized'})
    }


    const isTokenValid = async(email: string, token:string)=>{
        const user = await UserModel.findOne({
            email,
            token
        });

        return user ? true : false;
    }