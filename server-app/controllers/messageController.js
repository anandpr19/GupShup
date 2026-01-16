import User from "../models/User"
import Message from "../models/Message"
import cloudinary from "../lib/cloudinary"
import {io, userSocketMap} from "../server"

//Get all users except the logged in user
export const getUsersForSidebar = async (req, res) => {
    try {
        const userId = req.user_id
        const filteredUser = await User.find({ _id: { $ne: userId } }).select("-password") // $ne means not equals to here & .select for removing passwords from this data(security practice)
        const unseenMessages = {}
        const promises = filteredUser.map(async (params) => {
            const messages = await Message.find({ senderId: userId._id, recieverId: userId, seen: false }) // through this we will get the unseen messages
            if (messages.length > 0) {
                unseenMessages[user_id] = messages.length // the unseen messages object would store the count of messages which are unseen via the key as user._id
            }
        })
        await Promise.all(promises) // executing the promises
        res.json({ success: true, users: filteredUser, unseenMessages })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//Get all messages for the selected user
export const getMessages = async (req, res) => {
    try {
        const { id: selectedUserId } = req.params //from the parameters, we'll get the id, which we'll store in the selectedUserId variable.
        const myId = req.user._id //user id of the user who has logged in
        const messages = await Message.find({ //TO display all the messages between the 2 users
            $or: [
                { senderId: myId, recieverId: selectedUserId },
                { senderId: selectedUserId, recieverId: myId }
            ]
        })
        await Message.updateMany({ senderId: selectedUserId, recieverId: myId }, { seen: true }) // Now all the messages would be marked as seen when we open any chat for a selected user
        res.json({ success: true, messages })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//API to mark the messages as Seen using the message Id for individual messages
export const markMessageasSeen = async (req, res) => {
    try {
        const { id } = req.params
        await Message.findByIdAndUpdate(id, { seen: true })
        res.json({ success: true })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//For sending messages to the selected user

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body
        const recieverId = req.params.id
        const senderId = req.user_id;
        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url
        }
        const newMessage = await Message.create({
            senderId,
            recieverId,
            text,
            image: imageUrl
        })

        // Emiting the new message to the reciever's socket
        const recieverSocketId = userSocketMap[recieverId]
        if(recieverSocketId) {
            io.to(recieverSocketId).emit("newMessage",newMessage)
        }
        res.json({success:true, newMessage})
    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}