import User from "../models/User.js"
import jwt from 'jsonwebtoken'

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1] || req.headers.token
        
        if (!token) {
            return res.status(401).json({ 
                success: false,
                message: "Ijazat nahi hai: Token paryaapt nahi hua" 
            })
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId).select("-password")
        
        if (!user) {
            return res.json({
                success: false,
                message: "Aisa shaks bahi-khaate mein Maujood nahi hai"
            })
        }
        
        req.user = user
        next()
    } catch (error) {
        console.log("Auth error:", error.message)
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}