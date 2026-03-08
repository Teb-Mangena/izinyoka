import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ENV } from "../config/env.js";

export const protectAuth = async (req,res,next) => {
  try {
    // get token from cookies
    const {token} = req.cookies;

    if(!token){
      return res.status(400).json({message:"Not Authorized"})
    }

    // verify token
    const decoded = jwt.verify(token,ENV.JWT_SECRET);

    if(!decoded){
      return res.status(400).json({message:"Not Authorized"})
    }

    // find user
    const user = await User.findById(decoded.id).select("-password");

    if(!user){
      return res.status(400).json({message:"Not Authorized, user not found"});
    }

    req.user = user;
    
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    console.error('Error in the protectAuth',error);
    return res.status(500).json({message: 'Internal Server error'});
  }
}