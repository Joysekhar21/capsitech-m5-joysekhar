import userModel from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import upload from "../utils/multer.js"

const defaultAvatar = "https://res.cloudinary.com/dv3qbj0bn/image/upload/v1707049828/todoapp/kq3jhuljke1vlb4fysoh.png";
const registerController = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        if(!name){
            return res.status(400).json({message:"Name is Required"});
        }
        if(!email){
            return res.status(400).json({message: "Email is required"});
        }
        if(!password){
            return res.status(400).json({message:"Password is Required"});
        }
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(400).json({message: "User already exists Please login"});
        }
        const user = await userModel.create({
            name,
            email,
            password
        })
        const token = user.createJWT();
        res.status(200).json({
            message: "User Created Successfully",
            success: true,
            user:{
                name: user.name,
                email: user.email,
            },
            token
        })
    } catch (error) {
        console.log("Error in user registration",error);
        res.status(500).json({message: "Internal Server Error on registration", error});
    }
}

const loginController = async (req, res) => {
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: "Please provide all fields"})
        }
        const user = await userModel.findOne({email}).select("+password")
        if(!user){
            return res.status(400).json({message:"User Not Found"})
        }
        const isMatch = await user.comparePassword(password)
        if(!isMatch){
            return res.status(400).json({message:"Invalid Username or Password"})
        }
       
        const {password:_,...safeUser} = user.toObject()
        const token = user.createJWT();
        res.status(200).json({
            message: "Login Successfully",
            success: true,
            user: safeUser,
            token
        })
    } catch (error) {
        console.log("Error in user registration",error);
        res.status(500).json({message: "Internal Server Error on login", error});
    }
}


const updateUserController = async(req,res)=>{
    try {
        const {email,name,password} = req.body

        
        if (!(email || name) || !password) {
            return res.status(400).json({message:"Email or name and password is required"})
        }
        console.log(req.user._id)
        if(req.user === undefined){
            return res.status(400).json({message: "Token Not Found"})
        }
        const {_id} = req.user;
        const user = await userModel.findById(_id).select("+password")
        if(!user){
            return res.status(400).json({message: "User Not Found"})
        }
        const isPasswordValid = await user.comparePassword(password)
        
        if(!isPasswordValid){
            return res.status(401).json({message: "Invalid password"})
        }
        
        if (email) user.email = email
        if (name) user.name = name

        await user.save()
        const token= user.createJWT();
        const { password: _, ...safeUser } = user.toObject();
        return res.status(200).json({
            success: true,
            user:safeUser,
            token,
            message: "Details Update Successfully"
        })
    } catch (error) {
        console.log("Error in user Update Details",error);
        res.status(500).json({message: "Internal error on Update Details", error});
    }
}

const updatePasswordController = async(req,res)=>{
    try {
        const {oldPassword,newPassword} = req.body;
        if(!oldPassword || !newPassword){
            return res.status(400).json({message:"Both Password is Required"})
        }
        if(req.user == undefined){
            return res.status(400).json({message: "Token not found"})
        }
        const {_id} = req.user;
        const user = await userModel.findById(_id);
        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        const isPasswordValid = await user.comparePassword(oldPassword)
        if(!isPasswordValid){
            return res.status(401).json({message: "Invalid Password"})
        }
        user.password = newPassword;
        await user.save();
        const { password: _, ...safeUser } = user.toObject();
        return res.status(200).json({
            success: true,
            user,
            message: "Password Update Successfully"
        })
    } catch (error) {
        console.log("Error in user Update Password",error);
        res.status(500).json({message: "Internal on Update Password", error});
    }
}

const getUserController = async (req,res)=>{
    try {
        const user = req?.user;
        const isUser = await userModel.findOne({_id:user._id})
        if(!isUser){
            return res.sendStatus(401);
        }
        res.status(200).json({
            message: "Get The User",
            success: true,
            user: {
                _id: isUser._id,
                name: isUser.name,
                email: isUser.email,
                avatar: isUser.avatar,
                createdAt: isUser.createdAt
            }
        })
    } catch (error) {
        console.log("Error in user retrieved",error);
        res.status(500).json({message: "Internal Server Error on User retrieved", error});
    }
}

const uploadAvatarUserController = async(req,res)=>{
    try {
        const user = req?.user;
        const isUser = await userModel.findOne({_id:user._id})
        if(!isUser){
            return res.sendStatus(401);
        }
        const result = await cloudinary.uploader.upload(req.file.path)
        isUser.avatar = result.secure_url;
        isUser.cloudinary_id = result.public_id;

        await isUser.save();
        
        res.status(200).json({
            success: true,
            message: "Avatar uploaded successfully",
            avatar: result.secure_url,
            user: {
                name: isUser.name,
                email: isUser.email,
                avatar: isUser.avatar,
                cloudinary_id: isUser.cloudinary_id,
                createdAt: isUser.createdAt
            }
          })
    } catch (error) {
        console.log(error)
    }
}

const deleteAvatarUserController = async(req,res)=>{
    try {
        const user = req?.user;
        const isUser = await userModel.findById(user._id);
    
        if (!isUser) {
          return res.status(404).json({ message: "User not found" });
        }
    
        // Delete avatar from Cloudinary if it's not default
        if (isUser.cloudinary_id) {
          await cloudinary.uploader.destroy(isUser.cloudinary_id);
        }
    
        // Reset avatar and cloudinary_id
        isUser.avatar = defaultAvatar;
        isUser.cloudinary_id = null;
    
        await isUser.save();
    
        return res.status(200).json({
            success: true,
          message: "Avatar deleted successfully",
          avatar: isUser.avatar,
        });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
      }
}

const updateAvatarUserController = async(req,res)=>{
    try {
        const userId = req?.user?._id;
    
        const user = await userModel.findById(userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        // Delete old image from Cloudinary if available
        if (user.cloudinary_id) {
          await cloudinary.uploader.destroy(user.cloudinary_id);
        }
    
        // Upload new avatar to Cloudinary
        let result;
        if (req.file) {
          result = await cloudinary.uploader.upload(req.file.path);
        }
       
        // Update avatar fields
        user.avatar = result?.secure_url ;
        user.cloudinary_id = result?.public_id ;

        await user.save();
    
        return res.status(200).json({
            success: true,
          message: "Avatar updated successfully",
          avatar: user.avatar,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
      }
    
}



export {registerController,loginController,getUserController,updatePasswordController,updateUserController,uploadAvatarUserController,deleteAvatarUserController,updateAvatarUserController}