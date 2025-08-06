import mongoose from "mongoose";
import { parsedEnvVariables } from "./variables";

export const connectDB = async () => {
    try {
        await mongoose.connect(parsedEnvVariables.MONGODB_CONNECTION_STRING);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        process.exit(1);
    }
}

export default connectDB;