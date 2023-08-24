import express from "express"
import { registerUserType ,updateUserType,getUserType,updateUserTypeHosting,updateUserTypeDeploy} from "../controllers/UserType.js";
import { isAuthenticatedUser } from "../middleware/authmiddleware.js";

const router = express.Router();


router.post("/register", isAuthenticatedUser, registerUserType)
router.put("/update", isAuthenticatedUser, updateUserType)
router.post("/getUserType",getUserType)
router.put("/updatehosting",isAuthenticatedUser,updateUserTypeHosting)
router.put("/updatedeploy",isAuthenticatedUser,updateUserTypeDeploy)



export default router
