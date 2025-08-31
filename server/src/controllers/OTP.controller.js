import nodemailer from "nodemailer";
import { Otp } from "../models/OTP.moddle.js"

// Generate 6-digit OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// Mail transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// --- Send OTP ---
const sendOtp = async (req, res) => {
  const { email } = req.body;
  console.log("email : ",email)
  if (!email) return res.status(400).json({ success: false, message: 'Email is required.' });

  const otpCode = generateOtp();
  console.log("otpCode : ",otpCode)
  try {
    await Otp.deleteMany({ email }); // remove old OTPs
    await Otp.create({ email, otp: otpCode });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is ${otpCode}. It will expire in 5 minutes.`,
    });

    res.json({ success: true, message: 'OTP sent successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to send OTP.', error: err.message });
  }
};

// --- Verify OTP ---
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ success: false, message: 'Email and OTP are required.' });

  try {
    console.log(email,otp)
    const record = await Otp.findOne({ email, otp: otp.toString() });
    console.log(record)
    if (!record) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP.' });
    }

    await Otp.deleteMany({ email }); // clean up after success
    res.json({ success: true, message: 'Email verified successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'OTP verification failed.', error: err.message });
  }
};
export {
  sendOtp,
  verifyOtp
};
