import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    totalAmount: {type: Number, required: true},
    status: {type: String, required: true, default: "pending"},
    dishes: [{
        dish: {type: mongoose.Schema.Types.ObjectId, ref: "Dish"},
        quantity: {type: Number, required: true, default: 1}
    }],
    createdAt: {type: Date, required: true, default: Date.now},
    updatedAt: {type: Date, required: true, default: Date.now}
}, {
    versionKey: '__v',
    timestamps: true
})

const Order = mongoose.model("Order", orderSchema);
export default Order;