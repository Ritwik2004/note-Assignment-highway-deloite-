import Usergoogle from "../models/userModel.js";
import jwt from "jsonwebtoken"
User
export const protectRoute = async (req,res,next)=>{
    try {
        console.log("Comming in middlewire")
        const token = req.headers.token;
        if(!token) console.log("❌No token.")
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await Usergoogle.findById(decoded.userId).select("-password");
        if(!user){
            return res.json({success:false, message: "User not found"})
        }
        req.user = user;
        console.log("successfully executed middlewire") 
        next();
    } catch (error) {
        res.json({success: false,message: error.message})
    }
}

export const checkAuth = (req, res)=>{
    res.json({success:true, user: req.user});
}