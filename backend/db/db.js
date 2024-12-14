import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()
const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNXTION_STRING)
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log(error)
    }
}
export default connectToDatabase;