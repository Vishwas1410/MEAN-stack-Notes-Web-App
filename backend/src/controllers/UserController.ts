import { Request, Response } from "express";
import { UserModel } from "../db/users";
import { IRequest } from "../models/common.model";

class UserController{
    public async getAllUsers(request: Request, response: Response){
        try {
            const users = await UserModel.find();
            return response.status(200).json({data : users})
        } catch (error) {
            return response.status(400).json({"message":"Unauthorized",error})
        }
    }
    public async deleteUser(request:IRequest,response:Response){
        try {
            const id = request.params._id
            const user = await UserModel.findOneAndDelete({id});
            return response.status(200).json({data : user})
        } catch (error) {
            return response.status(400).json({"message":"Unauthorized",error})
        }
    }
}
export default new UserController();