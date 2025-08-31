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
        const {email, name} = userRes.data;
        console.log("data : ", userRes)
        let user = await Usergoogle.findOne({email});
        if (!user) {
            user = await Usergoogle.create({email, name});
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

const signup = async (req, res) => {
    console.log(req.body)
    const { fullName, email, DOB } = req.body;
    try {
        if (!fullName || !email || !DOB) {
            throw new ApiError(400, "All fields are required.");
        }

        const userFind = await Usergoogle.findOne({ email });
        if (userFind) {
            return res.json({ success: false, message: "Account with this email already exists..." });
        }

        const createUser = await Usergoogle.create({
            email,
            name : fullName,
            DOB
        });

        if (!createUser) {
            throw new ApiError(401, "Something went wrong while creating new user...");
        }

        const { _id } = createUser;
        const token = jwt.sign(
            { id: _id, email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        return res.status(200).json({
            message: 'Success',
            token,
            createUser
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error in time of signup',
            error: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const { email } = req.body
        const userData = await Usergoogle.findOne({ email })
        if (!userData) {
            return res.status(404).json({ success: false, message: "User with this email is not found. Please sign Up first !!!" })
        }
        const {_id} = userData;
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
            userData
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error in time of login',
            error: error.message
        })
    }
}



export {
    googleLogin,
    signup,
    login
}