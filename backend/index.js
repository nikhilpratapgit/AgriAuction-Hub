import express from 'express'
import cors from 'cors'
import colors from 'colors'
import dotenv from 'dotenv'
import connectDB from './db/index.js';
import cookieParser from 'cookie-parser'
// import userRoutes from './routes/User.routes.js'
// import productRoutes from './routes/Product.routes.js'
// import cartRoutes from './routes/Cart.routes.js'
// import checkoutRoutes from './routes/Checkout.routes.js'
// import orderRoutes from './routes/Order.routes.js'
// import uploadRoutes from './routes/Upload.routes.js'
// import subscriberRoutes from './routes/Subscriber.routes.js'
// import adminRoutes from './routes/Admin.routes.js'
// import productAdminRoutes from './routes/ProductAdmin.routes.js'
// import adminOrderRoutes from './routes/AdminOrder.routes.js'

dotenv.config()
const port = process.env.PORT || 5000
const app = express()
connectDB()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const corsOption = {
      origin: 'http://localhost:5173',
      credentials: true
}
app.use(cors(corsOption))

//Routes
// app.use('/api/v1/users',userRoutes)
// app.use('/api/v1/products',productRoutes)
// app.use('/api/v1/cart',cartRoutes)
// app.use('api/v1/checkout',checkoutRoutes)
// app.use('api/v1/orders',orderRoutes)
// app.use('api/v1/upload',uploadRoutes)
// app.use('api/v1/subscriber',subscriberRoutes)

// //Admin Routes
// app.use('api/v1/admin/users',adminRoutes)
// app.use('api/v1/admin/products',productAdminRoutes)
// app.use('api/v1/admin/orders',adminOrderRoutes)

app.listen(port,() => {
      console.log(`App running on port: ${port}`.bgCyan.white);
})