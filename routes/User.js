import express, { Router } from "express"
import { registerUser,loginUser, logout,getUserInfo ,gitrepoFetech } from "../controllers/User.js";
import { isAuthenticatedUser } from "../middleware/authmiddleware.js";
const router = express.Router();


router.post("/signup", registerUser);
router.post("/login", loginUser)
router.get("/logout",logout)
router.get("/me",isAuthenticatedUser,getUserInfo)
router.get("/gitrepo",isAuthenticatedUser,gitrepoFetech)

export default router
