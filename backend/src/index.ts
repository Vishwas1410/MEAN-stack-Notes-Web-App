import  express  from "express";
import mongoose from "mongoose";
import router from "./routes/route";
import cors from 'cors'

let PORT=5000;
const app=express();
app.use(express.json());
app.use(cors());
app.listen(PORT, ()=>{
    console.log(`Server Running on http://localhost:${PORT}`);
    
    const MONGO_URL= 'mongodb://127.0.0.1:27017';
    mongoose.connect(MONGO_URL,{
        dbName: 'notes-app',
    }).then(()=>{
        console.log('Database Connected');
        
    }).catch((error)=>{
        console.log("error:",error);
        
    });

    app.use('/',router)

})