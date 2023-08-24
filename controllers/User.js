import { User } from '../model/userModel.js';
import sendToken from "../utils/jwtToken.js";
import ErrorHandler from '../utils/errorHandler.js';
import { comparePassword } from '../utils/comparePassword.js';
import axios from 'axios';


export const registerUser = async (req, res, next) => {
    try {

        const { firstName, lastName, email, password } = req.body;

        const user =  await User.findOne({
            email: email
        })
        let name = firstName + " " + lastName
        if (!user) {
            const newUser = await User.create({
                name: name,
                email: email,
                password: password

            });
            sendToken(newUser, 201, res)
        }
        else {
            return next(new ErrorHandler("already registered", 401));

        }

    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
}


export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // checking if user has given password and email both

        if (!email || !password) {
            return next(new ErrorHandler("Please Enter Email & Password", 400));
        }

        const user = await User.findOne({ email }).select("+password");
        

        if (!user) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }

        const isPasswordMatched = await comparePassword(password,user.password)

        if (!isPasswordMatched) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }
        sendToken(user, 200, res)

    } catch (error) {
        return next(new ErrorHandler(error, 401))
    }
}

export const logout = async (req,res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
    
      res.status(200).json({
        success: true,
        message: "Logged Out",
      });
}

export const getUserInfo = async (req, res, next) => {
    try {
        const user = req.user;

        res.status(200).json({
            user
        })
        
    } catch (error) {
        return next(new ErrorHandler(error,401))
        
    }
}

export const gitrepoFetech = async (req,res,next)=>{
   
    const {username} = req.body;
        try {
          const response = await axios.get(
            `https://api.github.com/users/${username}/repos`,
            
          );
          res.json(response.data);
        } catch (error) {
          return next(new ErrorHandler(error,401))
        }
      
}

