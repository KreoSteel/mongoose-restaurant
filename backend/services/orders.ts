import Order from "../models/orders";

export async function getOrders(min=0, max=1000000) {
    // Filter out orders with invalid totalAmount (NaN, null, undefined)
    const orders = await Order.find({
        totalAmount: {
            $gte: min, 
            $lte: max,
            $ne: null,
            $exists: true
        }
    }).populate("dishes.dish");
    return orders;
}


export async function getOrderById(id:string) {
    const order = await Order.findById(id);
    return order;
}


export async function createOrder(order:typeof Order.schema.obj) {
    const newOrder = await Order.create(order);
    return newOrder;
}


export async function updateOrder(id:string, order:typeof Order.schema.obj) {
    const updatedOrder = await Order.findByIdAndUpdate(id, order, {new: true});
    return updatedOrder;
}


export async function deleteOrder(id:string) {
    const deletedOrder = await Order.findByIdAndDelete(id);
    return deletedOrder;
}