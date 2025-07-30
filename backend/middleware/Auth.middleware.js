import jwt from "jsonwebtoken";
import { User } from "../models/User.models.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
            
        } else if (req.cookies.token) {
            token = req.cookies.token;
        }
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - Invalid token"
            })
        }
        console.log(decoded)
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}

export const isAdmin = () =>{
    if(req.user.userType == 'admin'){
        next();
    }
    res.redirect('/login')
}

// Optional: Role-based access
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: `Role '${req.user.role}' not authorized` });
        }
        next();
    };
};