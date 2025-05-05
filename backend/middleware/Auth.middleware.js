import jwt from 'jsonwebtoken';
import { User } from '../models/User.models.js';

//Middleware to protect routes
const jwtAuthMiddleware = async (req,res,next) =>{
      let token;

      if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            try {
                  token = req.headers.authorization.split(" ")[1];
                  const decoded = jwt.verify(token, process.env.JWT_SECRET);

                  req.user = await User.findById(decoded.user.id).select('-password');
                  next();
            } catch (error) {
                  res.status(401).json({ success: false, msg: "Not Authorized,token failed" });
            }
      }else{
            res.status(401).json({ success: false, msg: "Not Authorized,no token provided" });
      }
}

// //Middleware to check if the user is an admin
// const admin = (req,res,next) => {
//       if(req.user && req.user.role === "admin"){
//             next();
//       }else{
//             res.status(403).json({success: false,msg: "Not authorized as an admin"})
//       }
// }

export {jwtAuthMiddleware};