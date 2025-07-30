
import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.models.js';
import sendEmail from '../utils/email.js';

//Register user
const register = async (req, res) => {
      try {
            const { username, email, password, role } = req.body;

            if (!username || !email || !password) {
                  return res.status(401).json({ success: false, message: "All fields are required" })
            }

            const user = await User.findOne({ email });
            if (user) {
                  return res.status(401).json({ success: false, message: "User Already Exist" })
            }

            const newUser = new User({ username, email, password, role });
            await newUser.save();

            //Sign JWT token
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

            const verifyUrl = `${process.env.CLIENT_URL}/verify-email/${token}`;

            const message = `
                 <h2>Hello ${username},</h2>
                 <p>Thanks for registering! Please verify your email by clicking the link below:</p>
                 <a href="${verifyUrl}" style="background:#22c55e;color:#fff;padding:10px 15px;text-decoration:none;border-radius:5px;">Verify Email</a>
                 <p>This link expires in 15 minutes.</p>
               `;

            await sendEmail(email, "Verify Your Email - AgriAuction Hub", message);

            res.status(200).cookie("token", token, {
                  httpOnly: true,
                  maxAge: 24 * 60 * 60 * 1000,
                  secure: process.env.NODE_ENV === "production",
                  sameSite: "lax",
            }).json({ success: true, message: "User registered successfully", newUser, token })
      } catch (error) {
            console.log(error.message)
            res.status(500).json({ success: false, message: "Internal Server Error" })
      }
}

// Resend verification email
const resendVerificationEmail = async (req, res) => {
      try {
            const { email } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                  return res.status(404).json({ success: false, message: "User not found" });
            }

            if (user.isVerified) {
                  return res.status(400).json({ success: false, message: "Email already verified" });
            }

            const emailToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

            const verifyUrl = `${process.env.CLIENT_URL}/verify-email/${emailToken}`;

            const message = `
      <h2>Hello ${user.username},</h2>
      <p>Please verify your email by clicking the link below:</p>
      <a href="${verifyUrl}" style="background:#22c55e;color:#fff;padding:10px 15px;text-decoration:none;border-radius:5px;">Verify Email</a>
      <p>This link expires in 15 minutes.</p>
    `;

            await sendEmail(email, "Resend: Verify Your Email - AgriAuction Hub", message);

            res.status(200).json({ success: true, message: "Verification email resent successfully." });
      } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
      }
};

//Login user

const login = async (req, res) => {
      try {
            const { email, password } = req.body;

            if (!email || !password) {
                  return res.status(401).json({ success: false, message: "All fields are required" })
            }

            const user = await User.findOne({ email }).select("+password");
            if (!user) {
                  return res.status(401).json({ success: false, message: "Invalid Credentials" })
            }
            if (!user.isVerified) {
                  return res.status(401).json({ success: false, message: "Please verify your email before logging in" });
            }


            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                  return res.status(401).json({ success: false, message: "Invalid Credentials" })
            }


            //Sign JWT token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
            res.status(200).cookie("token", token, {
                  httpOnly: true,
                  maxAge: 24 * 60 * 60 * 1000,
                  secure: process.env.NODE_ENV === "production",
                  sameSite: "lax",
            }).json({ success: true, message: "Login Successfully", user, token })
      } catch (error) {
            console.log(error.message)
            res.status(500).json({ success: false, msg: "Internal Server Error" })
      }
}

//Verify email

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({ success: false, message: "Verification token missing" });
    }

    // Decode token to get user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ success: false, message: "User already verified" });
    }

    // Mark user as verified and save
    user.isVerified = true;
    await user.save({ validateBeforeSave: false });

    return res.status(200).json({
      success: true,
      message: "Account verified successfully. You can now log in.",
    });
  } catch (error) {
    console.error("Verification error:", error.message);
    return res.status(400).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};


//logout user
const logout = async (req, res) => {
      try {
            res.status(200).clearCookie("token").json({ success: true, message: "User Logged Out successfully" });
      } catch (error) {
            console.log(error.message)
            res.status(500).json({ success: false, message: error.message });
      }
}
//Get user
const getUserProfile = async (req, res) => {
      try {
            const user = await User.findById(req.user).select("-password");
            console.log(user)
       
            if (!user) {
                  return res.status(401).json({ success: false, msg: "User Not Found" })
            }
            res.status(200).json({ success: true, msg: "User Found Successfully", user })
      } catch (error) {
            res.status(500).json({ success: false, msg: "Internal Server Error" })
      }
}

//update profile
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) user.password = req.body.password;
    user.photo = req.body.photo || user.photo;

    await user.save();

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      photo: user.photo,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};



export { register, login, logout, getUserProfile, resendVerificationEmail, verifyEmail,updateUserProfile };