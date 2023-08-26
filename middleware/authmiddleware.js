import  jwt  from "jsonwebtoken";
import { User } from "../model/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { redisConnection } from "../config/dbConnection.js";

const client = redisConnection();

export const isAuthenticatedUser= async (req, res, next) => {
   try {
       const token = req.cookies.token || req.cookies["connect.sid"];
       console.log(token);
  
    if (!token) {
      return next(new ErrorHandler("Please Login to access this resource", 401));
    }
  
        if (req.cookies.token)
       {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodedData.user._id);
       const redisToken= (await client).get(decodedData.user.email)
        }
   
    next();
    
   } catch (error) {
         return next(new ErrorHandler (error,400));
   }
  };

