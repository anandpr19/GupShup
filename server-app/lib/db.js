//For connection to Mongo Cloud

import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log('Database Connected'))
        mongoose.connection.on('error', (err) => console.log('Database Error:', err.message))

        // Remove trailing slashes from URI to prevent invalid namespace
        const uri = process.env.MONGO_URI.replace(/\/+$/, '')
        await mongoose.connect(`${uri}/chat-app`)
    } catch (error) {
        console.log('Connection Error:', error.message);
    }
}