import {Schema} from "mongoose";
import mongoose from "mongoose";

export const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
})

export default mongoose.model("Category", CategorySchema);