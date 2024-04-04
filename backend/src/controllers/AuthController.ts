import {Request,Response} from "express";
import { loginSchema, registerSchema } from "../_helpers/validators";
import bcrypt from 'bcrypt';
import { UserModel } from "../db/users";
import { generateToken } from "../middleware/authenticate";
import { IRequest, IUser } from "../models/common.model";
class AuthController{
    public async login(request: Request, response:Response ){
        try {
            const{email,password}= request.body;
            loginSchema.parse({ email, password });

            const user = await UserModel.findOne({
                email,
            });

            if (user) {
                const data: IUser={
                    _id: user.id.toString(),
                    email: user.email,
                    name: user.name,
                    token: '',
                    profilepic:user.profilepic || ''
                }
               const isPasswordMatch = await bcrypt.compare(password,user.password);
               if(isPasswordMatch){

                const token= generateToken(data);
                user.token=token;
                await user.save();
                data.token = token; 

                return response
                .status(201)
                .json({message:'User Logged in successfully',data})
               } 
            }
            return response.status(400).json({status: false,message:'Invalid User Credentials'})               

        } catch (error) {
         return response.status(400).json({status: false,error})               
        }
    }
    public async googleLogin(request: Request, response:Response ){
        try {
            const{email}= request.body;
            

            const user = await UserModel.findOne({
                email,
            });

            if (user) {
                
                const data: IUser={
                    _id: user.id.toString(),
                    email: user.email,
                    name: user.name,
                    token: '',
                    profilepic:user.profilepic || ''

                }
                const token= generateToken(data);
                user.token=token;
                await user.save();
                data.token = token; 
                return response
                .status(201)
                .json({message:'User Logged in successfully',data})
               
            }
            else{
                const{name,email}= request.body;
                const secret_id = "dasvasdiasdvdasdynaf@213831vidfwbniaw"
                const password:string = name+email+secret_id;
                const user = new UserModel({
                    name,
                    email,
                    password
                }); 
                await user.save();
                const data: IUser={
                    _id: user.id.toString(),
                    email: user.email,
                    name: user.name,
                    token: '',
                    profilepic:user.profilepic || ''
                }
                const token= generateToken(data);
                user.token=token;
                await user.save();
                data.token = token; 
                return response
                .status(201)
                .json({message:'User Logged in successfully',data})
                
                return response.status(201).json({message: 'User Created Successfully'});      
            }
            return response.status(400).json({status: false,message:'Invalid User Credentials'})               

        } catch (error) {
         return response.status(400).json({status: false,error}) 
                
        }
    }

   
    public async register(request: Request, response:Response ){
        try {
            const{name,email,password}= request.body;
            registerSchema.parse({ name, email, password });

            const saltRounds=10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashPassword= await bcrypt.hash(password, salt);
            const user = new UserModel({
                name,
                email,
                password: hashPassword
            });
            await user.save();
            return response.status(201).json({message: 'User Created Successfully'});

        } catch (error) {
         return response.status(400).json({status: false,error})               
        }
    }
    public async logout(request: IRequest, response:Response ){
        try {
            const email = request.user?.email;
            const user = await UserModel.findOne({
                email,
            });
            if(user){
                user.token = null;
                await user.save();
            }
            return response
                .status(200)
                .json({message:'User Logged out successfully'})

        } catch (error) {
            
        }
    }
    public async me(request: IRequest, response:Response ){
        try {
            const email = request.user?.email;
            const user = await UserModel.findOne({
                email,
            });
            if (user) {
                const data: IUser={
                    _id: user.id.toString(),
                    email: user.email,
                    name: user.name,
                    token: user.token || '',
                    profilepic:user.profilepic || ''
                }
                return response
                .status(201).json({data})
            }
        } catch (error) {
            return response.status(400).json({status: false,error})               

        }
    }
}

export default new AuthController();