import mongoose, { Schema } from "mongoose";
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true,
        unique: true
    },
    userID:{
        type: Schema.Types.ObjectId,
        ref : "Usergoogle"
    }
}, { timestamps: true });

const Notes = mongoose.model("Notes", noteSchema);
export default Notes;
