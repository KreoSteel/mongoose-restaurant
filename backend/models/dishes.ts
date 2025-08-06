import mongoose from "mongoose";
import {Schema} from "mongoose";

const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    categories: {
        type: [{type: Schema.Types.ObjectId, ref: "Category"}],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [{type: Schema.Types.ObjectId, ref: "Ingredient"}],
        required: true,
    },
    country: {
        type: String,
        required: true,
    }
});

export default mongoose.model("Dish", dishSchema);