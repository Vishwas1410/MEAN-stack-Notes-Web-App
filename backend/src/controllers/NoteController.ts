import { noteSchema } from "../_helpers/validators";
import { NotesModel } from "../db/notes";
import { IRequest } from "../models/common.model";
import { Response,Request } from "express";
import { IUser } from "../models/common.model";
import AuthController from "./AuthController";
import mongoose from "mongoose";

class NoteController{
    public async getAllNotes(request: IRequest, response:Response ){
        try {
            
                const id= request.user?._id
            const notes = await NotesModel.find({user:id,status:1}).sort({
                createdAt: -1,
            }).populate('user' , '_id name email');
            return response.status(200).json({data: notes})
        } catch (error) {
            return response.status(400).json({status: false,error})              
        }
    }
    public async getDeletedNotes(request: IRequest, response:Response ){
        try {
            
                const id= request.user?._id
            const notes = await NotesModel.find({user:id,status:2}).sort({
                createdAt: -1,
            }).populate('user' , '_id name email');
            return response.status(200).json({data: notes})
        } catch (error) {
            return response.status(400).json({status: false,error})              
        }
    }
    public async pinnedNotes(request:IRequest,response:Response){
        try {
            const id= request.user?._id
            const pins = await NotesModel.find({pinned:true,user:id}).sort({
                createdAt: -1
            }).populate('user' , '_id name email');
            return response.status(200).json({data: pins})


        } catch (error) {
            return response.status(400).json({status: false,error})
        }
    }

    public async getNotes(request: Request, response:Response ){
        try {

            const {id} = request.params;

            const note = await NotesModel.findById(id);
            return response.status(200).json({data: note})
        } catch (error) {
            return response.status(400).json({status: false,error})               
        }
    }
    public async updateNote(request: Request, response:Response ){
        try {

            const {id} = request.params;
            const {title,body,tag,pinned} = request.body;
           
            const note = await NotesModel.findOneAndUpdate({_id:id},{$set:{
                title,body,tag,pinned

            }});
            await note?.save()
            return response.status(200).json({data: note})
        } catch (error) {
            return response.status(400).json({status: false,error})               
        }
    }

    public async addNotes(request: IRequest, response:Response ){
        try {
            const user = request.user?._id
            const {title , body} = request.body;
            noteSchema.parse({title,body,user});
            const note = new NotesModel({
                user,
                title,
                body,
                status:1
            });
            await note.save();
            return response.status(200).json({message:"Note Created",data: note})
        } catch (error) {
            return response.status(400).json({status: false,error})               
        }
    }


    public async deleteNotes(request: Request, response:Response ){
        try {

            const {id} = request.params;
            
            const note = await NotesModel.findById(id);
            if(note){
                note.status=2;
                await note.save();
            }
            return response.status(200).json({message:"Note Deleted",data: note})
        } catch (error) {
            return response.status(400).json({status: false,error})               
        }
    }


}


export default new NoteController();