import mongoose, { Schema, mongo } from "mongoose";
import { boolean } from "zod";

const NotesSchema = new mongoose.Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    title:{
        type: String,
        required: true,
    },
    body:{
        type: String,
        required: true,
        
    },
    pinned:{
        type: Boolean,
        default: false
    },
    tag:{
        type: String,
    },
    status:{
        type: Number,
        default: 1
    },

    

},{
    timestamps: true,
}
)

export const NotesModel = mongoose.model('Notes',NotesSchema);