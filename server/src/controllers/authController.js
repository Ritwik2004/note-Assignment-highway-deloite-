import Usergoogle from "../models/userModel.js";
import { oauth2Client } from "../utils/googleConfig.js";
import axios from 'axios';
import jwt from 'jsonwebtoken';

const googleLogin = async(req, res) => {
    try {
        const {code} = req.query;
        const googleRes = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(googleRes.tokens);

        const userRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`)
        const {email, name, picture} = userRes.data;
        let user = await Usergoogle.findOne({email});
        if (!user) {
            user = await Usergoogle.create({email, name, image: picture});
        }
        const {_id} = user;
        const token = jwt.sign(
            {
                id: _id, email
            }, 
            process.env.JWT_SECRET, 
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );
        return res.status(200).json({
            message: 'Success',
            token,
            user
        })
        
    } catch (error) {
        console.log("error : ",error)
        res.status(500).json({
            message: 'Error in Google login',
            error: error.message
        })
    }
};


export {
    googleLogin
}