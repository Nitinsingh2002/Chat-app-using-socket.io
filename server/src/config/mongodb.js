import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.DB_URL 


export const mongoConnection = async () => {
    try {
        await mongoose.connect(url)
        console.log("Connected to MongoDB")
    } catch (err) {
        console.log("Error connecting to MongoDB", err)
    }
}