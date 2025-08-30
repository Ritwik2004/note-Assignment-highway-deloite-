import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image:{
        type: String
    }
}, { timestamps: true });

const Usergoogle = mongoose.model("Usergoogle", userSchema);
export default Usergoogle;
