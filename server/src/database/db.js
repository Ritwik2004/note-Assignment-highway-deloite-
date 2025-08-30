import mongoose from "mongoose";
import DB_NAME from "../constant.js";

const DBconnection = async ()=>{
    try {
        mongoose.connection.on('connected', ()=> console.log('Database Connected'));
        const connect = await mongoose.connect(`${process.env.DB_URI}/${DB_NAME}`)
    } catch (error) {
        console.log("MongoDb connection error : ",error);
        process.exit(1);
    }
    
}
export default DBconnection;