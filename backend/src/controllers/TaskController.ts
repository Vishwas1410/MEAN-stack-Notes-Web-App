

import { noteSchema, taskSchema } from "../_helpers/validators";
import { NotesModel } from "../db/notes";
import { IRequest } from "../models/common.model";
import { Response,Request } from "express";
import { IUser } from "../models/common.model";
import AuthController from "./AuthController";
import mongoose from "mongoose";
import { TasksModel } from "../db/tasks";

class TasksController{
    public async getAllTasks(request: IRequest, response:Response ){
        try {
            
                const id= request.user?._id
            const tasks = await TasksModel.find({user:id,completed:false}).sort({
                createdAt: -1,
            }).populate('user' , '_id name email');
            return response.status(200).json({data: tasks})
        } catch (error) {
            return response.status(400).json({status: false,error})              
        }
    }
    public async completedTasks(request:IRequest,response:Response){
        try {
            const id= request.user?._id
            const Task = await TasksModel.find({completed:true,user:id})
            return response.status(200).json({data: Task})


        } catch (error) {
            return response.status(400).json({status: false,error})
        }
    }
    public async deletedTasks(request:IRequest,response:Response){
        try {
            const id= request.user?._id
            const Task = await TasksModel.find({status:2,user:id})
            return response.status(200).json({data: Task})


        } catch (error) {
            return response.status(400).json({status: false,error})
        }
    }

    public async getTasks(request: Request, response:Response ){
        try {

            const {id} = request.params;

            const Task = await TasksModel.findById(id);
            return response.status(200).json({data: Task})
        } catch (error) {
            return response.status(400).json({status: false,error})               
        }
    }
    public async updateTask(request: Request, response:Response ){
        try {

            const {id} = request.params;
            const {title,date,completed} = request.body;
           
            const Task = await TasksModel.findOneAndUpdate({_id:id},{$set:{
                title,date,completed

            }});
            await Task?.save()
            return response.status(200).json({data: Task})
        } catch (error) {
            return response.status(400).json({status: false,error})               
        }
    }

    public async addTask(request: IRequest, response:Response ){
        try {
            const user = request.user?._id
            const {title , date} = request.body;
            taskSchema.parse({title});
            const Task = new TasksModel({
                user,
                title,
                date,
                status:1
            });
            await Task.save();
            return response.status(200).json({message:"Task Created",data: Task})
        } catch (error) {
            return response.status(400).json({status: false,error})               
        }
    }


    public async deleteTasks(request: Request, response:Response ){
        try {

            const {id} = request.params;
            
            const Task = await TasksModel.findById(id);
            if(Task){
                Task.status=2;
                await Task.save();
            }
            return response.status(200).json({message:"Task Deleted",data: Task})
        } catch (error) {
            return response.status(400).json({status: false,error})               
        }
    }
    public async taskProgress(request: Request, response:Response ){
        try {

            const {id} = request.params;
            var {completed} = request.body;
            if(completed==true){
                completed=false
            }
            else{
                completed=true
            }
            
           
            const Task = await TasksModel.findOneAndUpdate({_id:id},{$set:{
                completed

            }});
            await Task?.save()
            return response.status(200).json({data: Task})
        } catch (error) {
            return response.status(400).json({status: false,error})               
        }
    }


}


export default new TasksController();