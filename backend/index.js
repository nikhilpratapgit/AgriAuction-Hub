import express from 'express'
import cors from 'cors'
import colors from 'colors'
import dotenv from 'dotenv'
import connectDB from './db/index.js';
import cookieParser from 'cookie-parser'
import path from 'path'
import userRoutes from './routes/User.routes.js'
import auctionRoutes from './routes/Auction.routes.js'
import authRoutes from './routes/auth.routes.js'
import bidRoutes from './routes/Bid.routes.js'
import passport from 'passport';
import MongoStore from 'connect-mongo';
import session from 'express-session';

import './config/passport.js';
import connectCloudinary from './config/cloudinary.js';

dotenv.config()
const port = process.env.PORT || 5000
const app = express()
connectDB();
connectCloudinary();

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));
app.use(cookieParser())
const corsOption = {
      origin: 'http://localhost:5173',
      credentials: true
}
app.use(cors(corsOption))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    ttl:  24 * 60 * 60, // 14 days
  }),
  cookie: {
    httpOnly: true,
    secure: false, // true in production with HTTPS
    sameSite: "lax", // or "none" with secure: true
    maxAge:  24 * 60 * 60 * 1000 
  }
}));

app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auctions', auctionRoutes);
app.use('/api/v1/bids', bidRoutes);
app.use('/api/v1/auth',authRoutes)

app.listen(port,() => {
      console.log(`App running on port: ${port}`.bgCyan.white);
})