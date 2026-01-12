import cloudinary from "../lib/cloudinary"
import { generateToken } from "../lib/utils"
import User from "../models/User"
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary"

export const signup = async (req, res) => {
    const { fullName, email, password, bio } = req.body
    try {
        if (!fullName || !email || !password || !bio) {
            return res.json({ success: false, message: "Jaankaari ki Kami" })
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.json({ success: false, message: "Pehle se Maujood hai" })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({ fullName, email, password: hashedPassword, bio })

        const token = generateToken(newUser._id)

        res.json({ success: true, userData: newUser, token, message: "Khaata Khul Chuka hai" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const userData = await User.findOne({ email })
        const ispassWordCorrect = bcrypt.compare(password, userData.password)
        if (!ispassWordCorrect) {
            res.json({ success: false, message: "Kripya Galtiyan Jaanch Lein" })
        }
        const token = generateToken(newUser._id)

        res.json({ success: true, userData, token, message: "Swagat hai Aapka" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

//Controller to check Authentication

export const checkAuth=(req,res)=>{
    res.json({success:true,user:req.user})
}

//Controller for user to update profile details

export const updateProfile=async (req,res) => {
    try {
        const {profilePic,fullName,bio} =req.body;
        const userId = req.user._id
        let updatedUser
        if(!profilePic){
            updatedUser = await User.findByIdAndUpdate(userId,{bio,fullName},{new:true})
        }else{
            const upload = await cloudinary.uploader.upload(profilePic)
            updatedUser = await User.findByIdAndUpdate(userId,{profilePic:upload.secure_url,bio,fullName},{new:true})
        }
        res.json({success:true,message:"Chhavi aur Jaankari Badal gayi hai"})
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}