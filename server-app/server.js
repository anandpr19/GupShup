import express from 'express'
import "dotenv/config"
import cors from 'cors'
import http from 'http'
import { connectDB } from './lib/db.js'
import userRouter from './routes/userRoutes.js'

//Created Express app & Http Server
const app = express()
const server = http.createServer(app)

//Middleware setup 

app.use(express.json({limit:"4mv"}))
app.use(cors())

//Routes Setup
app.use("/api/status",(req,res)=>res.send("Server is live "))
app.use("/api/auth",userRouter)

await connectDB()
const PORT = process.env.PORT || 4000
server.listen(PORT, ()=> console.log(`Server Running on PORT: ${PORT}`))
