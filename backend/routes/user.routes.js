import {Router} from "express"
import { deleteAvatarUserController, getUserController, loginController, registerController, updateAvatarUserController, updatePasswordController, updateUserController, uploadAvatarUserController } from "../controller/user.controller.js";
import userAuth from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import  {signupSchema, loginSchema, passwordSchema } from "../validator/auth-validator.js";
import upload from "../utils/multer.js"

const router = Router();

router.post("/create-account",validate(signupSchema),registerController)
router.post("/login",validate(loginSchema),loginController)
router.put("/updateDetails",userAuth,validate(signupSchema),updateUserController)
router.patch("/changePassword",userAuth,validate(passwordSchema),updatePasswordController)
router.get("/get-user",userAuth,getUserController)
router.post("/uploadImage",userAuth,upload.single('image'),uploadAvatarUserController)
router.delete("/deleteImage",userAuth,deleteAvatarUserController)
router.put("/updateImage",userAuth,upload.single('image'),updateAvatarUserController)

export default router;