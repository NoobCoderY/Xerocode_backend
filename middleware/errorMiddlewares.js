import ErrorHandler from "../utils/errorHandler.js"

export const errorMiddlewares=(err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
        success:false,
        err:err.message
      })
}
