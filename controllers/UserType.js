import { UserType } from "../model/userTypeModel.js";
import ErrorHandler from "../utils/errorHandler.js";


 export const registerUserType = async (req,res,next) => {
     try {
        
         const { id } = req.body;
         console.log(id);
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
        const {id, hostingOption, newuserType,companyName,developerName,orgnizationName } = req.body;
        
       
        
        const updateUserType = await UserType.findOneAndUpdate({ userId: id }, {
            $set: {
               hostingOption: hostingOption,
                userType: newuserType,
                companyName: companyName,
                orgnizationName: orgnizationName,
                developerName:developerName
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
