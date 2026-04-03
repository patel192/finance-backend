import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name :{
        type:String,
        required:[true,"Please enter your name"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minLength:[6,"Password must be at least 6 characters Long"],
        select:false
    },
    role:{
        type:String,
        enum:["viewer","analyst","admin"],
        default:"viewer"
    }
},{
    timestamps:true
});

// Password hashing middleware
userSchema.pre("save",async function () {
    if(!this.isModified("password")){
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

//Password comparison

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
};

const User = mongoose.model("User",userSchema);

export default User;