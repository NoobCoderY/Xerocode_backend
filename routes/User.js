import express, { Router } from "express"
import { registerUser,loginUser, logout } from "../controllers/User.js";
const router = express.Router();


router.post("/signup", registerUser);
router.post("/login", loginUser)
router.get("/logout",logout)
router.get("/me",isAuthenticatedUser,getUserInfo)

export default router
