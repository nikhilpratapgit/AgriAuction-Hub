import express from 'express'
import cors from 'cors'
import colors from 'colors'
import dotenv from 'dotenv'
import connectDB from './db/index.js';
import cookieParser from 'cookie-parser'
import path from 'path'
import authRoutes from './routes/User.routes.js'
import auctionRoutes from './routes/Auction.routes.js'
import bidRoutes from './routes/Bid.routes.js'


dotenv.config()
const port = process.env.PORT || 5000
const app = express()
connectDB()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));
app.use(cookieParser())
const corsOption = {
      origin: 'http://localhost:5173',
      credentials: true
}
app.use(cors(corsOption))

//Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/auctions', auctionRoutes);
app.use('/api/v1/bids', bidRoutes);

app.listen(port,() => {
      console.log(`App running on port: ${port}`.bgCyan.white);
})