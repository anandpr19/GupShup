import User from "../models/User"
import jwt from 'jsonwebtoken'
//Middlware for protected routes
export const protectRoute =async (req,res,next) => {
    try {
        const token = req.headers.token
        if(!token){
            return res.status(401).json({ message: "Ijazat nahi hai:Token paryaapt nahi hua" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId).select("-password")
        if(!user){
            res.json({success:false,message:"Aisa shaks bahi-khaate mein Maujood nahi hai"})
        }
        req.user = user
        next();
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}