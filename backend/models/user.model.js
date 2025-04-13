import mongoose,{Schema} from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken"
const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        index:true
    },
    avatar:{
        type: String,
        default: "https://res.cloudinary.com/dtiymmunh/image/upload/v1744533921/blank-profile-picture-973460_1280_gppsom.webp"
    },
    password:{
        type: String,
        required: true,
        minlength: 8,
        trim: true,
        select: true
    },
    cloudinary_id:{
        type: String
    }
},{timestamps: true})


userSchema.pre('save',async function(){
    if(!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
});

userSchema.methods.comparePassword = async function(userPassword){
    const isMatch = await bcrypt.compare(userPassword,this.password);
    return isMatch
}

userSchema.methods.createJWT = function (){
    return JWT.sign(
        {
            _id: this._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRY
        }
    )
}

const userModel = mongoose.model('User',userSchema);
export default userModel;
