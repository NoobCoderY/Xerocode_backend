import jwt from "jsonwebtoken";
import { redisConnection } from "../config/dbConnection.js";

const client = redisConnection();
const sendToken = async (user, statusCode, res) => {
    const token = await  jwt.sign({user}, process.env.JWT_SECRET, {
        expiresIn:"5d",
      });
  
    // options for cookie
    const options = {
      expires: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
  };
  (await client).set(user.email, token)
  
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
};

  
export default sendToken;