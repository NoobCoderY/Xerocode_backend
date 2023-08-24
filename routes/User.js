import express, { Router } from "express"
import { registerUser,loginUser, logout,getUserInfo  } from "../controllers/User.js";
import { isAuthenticatedUser } from "../middleware/authmiddleware.js";
const router = express.Router();


router.post("/signup", registerUser);
router.post("/login", loginUser)
router.get("/logout",logout)
router.get("/me",isAuthenticatedUser,getUserInfo)

export default router
