import { Request, Response } from "express";
import { createOrder, getOrders, getOrderById, updateOrder, deleteOrder } from "../services/orders";
import { defineError } from "../utils/error";
import Ingredient from "../models/ingredients";
import Dish from "../models/dishes";

interface DishItem {
    dish: string;
    quantity?: number;
}

export const ordersControllers = {
    getOrders: async (req: Request, res: Response) => {
        try {
            const {min, max} = req.query
            
            const minAmount = min ? parseInt(min as string) : 0;
            const maxAmount = max ? parseInt(max as string) : 1000000;

            if (isNaN(minAmount) || isNaN(maxAmount)) {
                return res.status(400).json({message: "Invalid min or max amount"});
            }
            
            const orders = await getOrders(minAmount, maxAmount);
            res.status(200).json(orders);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            res.status(500).json({message: defineError(errorMessage)});
        }
    },

    
    createOrder: async (req: Request, res: Response) => {
        try {
            if (!req.body.dishes) {
                return res.status(400).json({message: `Dishes are required`});
            }
            // Extract dish IDs from the dishes array (supporting both old and new format)
            const dishIds = req.body.dishes.map((item: DishItem | string) => 
                typeof item === 'string' ? item : item.dish
            );
            
            const dishesToOrder = await Dish.find({_id: {$in: dishIds}});
            if (dishesToOrder.length !== dishIds.length) {
                return res.status(404).json({message: `One or more dishes not found`});
            }
            
            // Calculate total amount considering quantities
            let totalAmount = 0;
            const dishesWithQuantities = req.body.dishes.map((item: DishItem | string) => {
                const dish = dishesToOrder.find(d => d._id.toString() === (typeof item === 'string' ? item : item.dish));
                if (!dish) {
                    throw new Error(`Dish not found`);
                }
                const quantity = typeof item === 'string' ? 1 : (item.quantity || 1);
                totalAmount += dish.price * quantity;
                return {
                    dish: dish._id,
                    quantity: quantity
                };
            });
            
            req.body.totalAmount = totalAmount;
            req.body.dishes = dishesWithQuantities;

            // Update ingredient stock
            for (const item of dishesWithQuantities) {
                const dish = dishesToOrder.find(d => d._id.toString() === item.dish.toString());
                if (!dish) {
                    return res.status(404).json({message: `Dish not found`});
                }
                if (dish.ingredients) {
                    for (const ingredientId of dish.ingredients) {
                        const ingredient = await Ingredient.findById(ingredientId);
                        if (!ingredient) {
                            return res.status(404).json({message: `One or more ingredients not found`});
                        }
                        const requiredStock = item.quantity;
                        if (ingredient.stock < requiredStock) {
                            return res.status(400).json({message: `Insufficient stock for ${ingredient.name}`});
                        }
                        ingredient.stock -= requiredStock;
                        await ingredient.save();
                    }
                }
            }
            const order = await createOrder({
                totalAmount: totalAmount,
                status: "pending",
                dishes: req.body.dishes
            });
            res.status(201).json(order);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            res.status(500).json({message: defineError(errorMessage)});
        }
    },

    changeOrderStatus: async (req: Request, res: Response) => {
        try {
            const status = req.body.status;
            if (status !== "pending" && status !== "completed" && status !== "cancelled") {
                return res.status(400).json({message: `Invalid status`});
            }
            const order = await updateOrder(req.params.id, {status});
            res.status(200).json(order);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            res.status(500).json({message: defineError(errorMessage)});
        }
    },


    addItemToOrder: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { dishId, quantity } = req.body;
            const dish = await Dish.findById(dishId);
            if (!dish) {
                return res.status(404).json({message: `Dish not found`});
            }
            for (const ingredientId of dish.ingredients) {
                const ingredient = await Ingredient.findById(ingredientId);
                if (!ingredient) {
                    return res.status(404).json({message: `One or more ingredients not found`});
                }
                const requiredStock = quantity;
                if (ingredient.stock < requiredStock) {
                    return res.status(400).json({message: `Insufficient stock for ${ingredient.name}`});
                }
                ingredient.stock -= requiredStock;
                await ingredient.save();
            }
            const order = await getOrderById(id);
            if (!order) {
                return res.status(404).json({message: `Order not found`});
            }
            if (quantity <= 0) {
                return res.status(400).json({message: `Quantity must be greater than 0`});
            }
            const existingItem = order.dishes.find((item) => item.dish?.toString() === dishId.toString());
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                order.dishes.push({dish: dishId, quantity});
            }
            // Calculate total amount by fetching dish prices
            let totalAmount = 0;
            for (const item of order.dishes) {
                const dishData = await Dish.findById(item.dish);
                if (dishData) {
                    totalAmount += dishData.price * item.quantity;
                }
            }
            order.totalAmount = totalAmount;
            await order.save();
            res.status(200).json(order);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            res.status(500).json({message: defineError(errorMessage)});
        }
    },
    
    removeItemFromOrder: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { dishId } = req.body;
            const order = await getOrderById(id);
            if (!order) {
                return res.status(404).json({message: `Order not found`});
            }
            const dishIndex = order.dishes.findIndex((dish) => dish.dish?.toString() === dishId.toString());
            if (dishIndex === -1) {
                return res.status(404).json({message: `Dish not found in order`});
            }
            order.dishes.splice(dishIndex, 1);
            // Calculate total amount by fetching dish prices
            let totalAmount = 0;
            for (const item of order.dishes) {
                const dishData = await Dish.findById(item.dish);
                if (dishData) {
                    totalAmount += dishData.price * item.quantity;
                }
            }
            order.totalAmount = totalAmount;
            await order.save();
            res.status(200).json(order);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            res.status(500).json({message: defineError(errorMessage)});
        }
    },

    deleteOrder: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const order = await getOrderById(id);
            if (!order) {
                return res.status(404).json({message: `Order not found`});
            }
            await deleteOrder(id);
            res.status(200).json({message: `Order deleted successfully`});
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            res.status(500).json({message: defineError(errorMessage)});
        }
    }
}