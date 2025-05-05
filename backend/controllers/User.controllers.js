import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.models.js';

//Register user
const register = async (req, res) => {
      try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                  return res.status(401).json({ success: false, msg: "All fields are required" })
            }

            const user = await User.findOne({ name });
            if (user) {
                  return res.status(401).json({ success: false, msg: "User Already Exist" })
            }

            const newUser = new User({ name, email, password });
            await newUser.save();

            //Create JWT payload
            const payload = {
                  user: { id: newUser._id }
            }
            //Sign JWT token
            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
                  if (err) throw err;
                  res.status(201).json({ success: true, msg: "User Created Successfully", user: newUser, token });
            })

      } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, msg: "Internal Server Error" })
      }
}
//Login user

const login = async (req, res) => {
      try {
            const { email, password } = req.body;

            if (!email || !password) {
                  return res.status(401).json({ success: false, msg: "All fields are required" })
            }

            const user = await User.findOne({ email });
            if (!user) {
                  return res.status(401).json({ success: false, msg: "Invalid Credentials" })
            }

            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                  return res.status(401).json({ success: false, msg: "Invalid Credentials" })
            }

            //Create JWT payload
            const payload = {
                  user: { id: user._id }
            }
            //Sign JWT token
            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
                  if (err) throw err;
                  res.status(200).json({ success: true, msg: "User Logged In Successfully", user, token });
            })
      } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, msg: "Internal Server Error" })
      }
}
//Get user
const getUser = async (req, res) => {
     try{
            const user = await User.findById(req.user.id).select("-password");

            if(!user){
                  return res.status(401).json({ success: false, msg: "User Not Found" })
            }
            res.status(200).json({ success: true, msg: "User Found", user })   
      }catch(error){
            res.status(500).json({ success: false, msg: "Internal Server Error" })
      }
}

export { register, login, getUser};