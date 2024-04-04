import mongoose, { Schema, mongo } from "mongoose";
import { boolean, number } from "zod";

const TasksSchema = new mongoose.Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    title:{
        type: String,
        required: true,
    },
    completed:{
        type: Boolean,
        default: false
    },
    date:{
        type: Date,
    },
    status:{
        type: Number,
        default: 1
    },
    

    

},{
    timestamps: true,
}
)

export const TasksModel = mongoose.model('Tasks',TasksSchema);