import express from "express"
import { registerUserType ,updateUserType} from "../controllers/UserType.js";
import { isAuthenticatedUser } from "../middleware/authmiddleware.js";

const router = express.Router();


router.post("/register", isAuthenticatedUser, registerUserType)
router.put("/update", isAuthenticatedUser, updateUserType)



export default router