import { UserType } from "../model/userTypeModel.js";
import ErrorHandler from "../utils/errorHandler.js";


 export const registerUserType = async (req,res,next) => {
     try {
        
         const { id } = req.body;
          const userTypeFind = await UserType.findOne({ userId: id })
         if (userTypeFind) {
             return;
         }
        const userType = await UserType.create({
            userId:id
        })
        console.log(userType);

        res.status(200).json({
            message: "sucessfully usertype created",
            userType
        })
        
     } catch (error) {
        return next(new ErrorHandler(error,401))
     }
}
 
export const updateUserType = async(req,res,next) => {
   try {
        const { id, hostingOption, newuserType } = req.body;
        console.log(hostingOption,newuserType);
        
        const updateUserType = await UserType.findOneAndUpdate({ userId: id }, {
            $set: {
             
                userType: newuserType
            }
        },
            {
                new:true,      
            })
    
        res.status(200).json({
            message: "sucessfully updated",
            updateUserType
        })

    } catch (error) {
        return next(new ErrorHandler(error,401))
    }
}

export const getUserType = async (req, res, next) => {
    try {
        const {id}=req.body
        const userType = await UserType.findOne({ userId: id })
        
        res.status(200).json({
            userType
        })
        
    } catch (error) {
        return next(new ErrorHandler(error,401))
        
    }
}

export const updateUserTypeHosting = async(req,res,next) => {
    try {
        const { id, hostingOption } = req.body;
        console.log(hostingOption);
        
        const updateUserType = await UserType.findOneAndUpdate({ userId: id }, {
            $set: {
             
                hostingOption:hostingOption
            }
        },
            {
                new:true,      
            })
    
        res.status(200).json({
            message: "sucessfully updated",
            updateUserType
        })

    } catch (error) {
        return next(new ErrorHandler(error,401))
    }
}

export const updateUserTypeDeploy = async(req,res,next) => {
    try {
        const { id, deployOption } = req.body;
        
        const updateUserType = await UserType.findOneAndUpdate({ userId: id }, {
            $set: {
             
                deploy:deployOption 
            }
        },
            {
                new:true,      
            })
    
        res.status(200).json({
            message: "sucessfully updated",
            updateUserType
        })

    } catch (error) {
        return next(new ErrorHandler(error,401))
    }
}

