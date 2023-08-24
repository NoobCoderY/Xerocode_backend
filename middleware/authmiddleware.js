import  jwt  from "jsonwebtoken";
import { User } from "../model/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";

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
        console.log(req.user ,2);
        }
    next();
    
   } catch (error) {
         return next(new ErrorHandler (error,400));
   }
  };

