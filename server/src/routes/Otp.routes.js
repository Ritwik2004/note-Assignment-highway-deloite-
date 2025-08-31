import express from "express";
import { sendOtp, verifyOtp } from '../controllers/OTP.controller.js';
const OtpRouter = express.Router();

OtpRouter.post('/send-otp', sendOtp);
OtpRouter.post('/verify-otp', verifyOtp);

export default OtpRouter;
