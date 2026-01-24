import express from 'express'
import "dotenv/config"
import cors from 'cors'
import http from 'http'
import { connectDB } from './lib/db.js'
import userRouter from './routes/userRoutes.js'
import messageRouter from './routes/messageRoutes.js'
import { Server } from 'socket.io'

//Created Express app & Http Server
const app = express()
const server = http.createServer(app)

//Initialize socket.io server
export const io = new Server(server,{
    cors:{origin:"*"}, //allowing cors for -> all [ "*" ]
    credentials:true
})

//Store Online Users 
export const userSocketMap={}; //{userId, socketId}

//Store Online users

io.use((socket, next) => {
    console.log("Socket attempting to connect")
    console.log("Namespace:", socket.nsp.name)
    console.log("Handshake query:", socket.handshake.query)
    next()
})

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId
    console.log("User Connected", userId)
    if(userId) userSocketMap[userId] = socket.id

    io.emit("getOnlineUsers", Object.keys(userSocketMap))
    
    socket.on("disconnect", ()=>{
        console.log("User disconnected", userId)
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})

//Middleware setup 
app.use(express.json({limit:"4mb"}))
app.use(cors())

//Routes Setup
app.use("/api/status",(req,res)=>res.send("Server is live "))
app.use("/api/auth",userRouter)
app.use("/api/messages",messageRouter)

await connectDB()
const PORT = process.env.PORT || 4000
server.listen(PORT, ()=> console.log(`Server Running on PORT: ${PORT}`))
