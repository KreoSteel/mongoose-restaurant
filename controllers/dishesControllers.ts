import { Request, Response } from "express";
import { createDish, deleteDish, getDishes, getDishById, updateDish } from "../services/dishes";
import Category from "../models/categories";
import Ingredient from "../models/ingredients";

export const dishesControllers = {
    getDishes: async (req: Request, res: Response) => {
        try {
            const {page, limit} = req.query;
            const categories = req.query.categories as string;
            console.log(categories);
            const categoriesArray = categories ? categories.split(",") : [];
            console.log(categoriesArray);
            const {min, max} = req.query
            
            const minAmount = min ? parseInt(min as string) : 0;
            const maxAmount = max ? parseInt(max as string) : 1000000;

            if (isNaN(minAmount) || isNaN(maxAmount)) {
                return res.status(400).json({message: "Invalid min or max amount"});
            }
            
            const dishes = await getDishes(Number(page), Number(limit), categoriesArray, minAmount, maxAmount);
            res.status(200).json(dishes);
        } catch (error) {
            res.status(500).json({message: "Failed to get dishes", error});
        }
    },

    getDishById: async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const dish = await getDishById(id);
            if (!dish) {
                return res.status(404).json({message: "Dish not found"});
            }
            res.status(200).json(dish);
        } catch (error) {
            res.status(500).json({message: "Failed to get dish", error});
        }
    },

    createDish: async (req: Request, res: Response) => {
        try {
            const {name, categories, price, description, ingredients, country} = req.body;
            if (!name || !categories || !price || !description || !ingredients || !country) {
                return res.status(400).json({message: "All fields are required"});
            }
            const categoriesExists = await Category.find({_id: {$in: categories}});
            if (categoriesExists.length !== categories.length) {
                return res.status(400).json({message: "One or more categories not found"});
            }
            const ingredientsExists = await Ingredient.find({_id: {$in: ingredients}});
            if (ingredientsExists.length !== ingredients.length) {
                return res.status(400).json({message: "One or more ingredients not found"});
            }
            
            const dish = await createDish({name, categories, price, description, ingredients, country});
            res.status(201).json(dish);
        } catch (error) {
            res.status(500).json({message: "Failed to create dish", error});
        }
    },

    updateDish: async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const {name, categories, price, description, ingredients, country} = req.body;
            if (!name || !categories || !price || !description || !ingredients || !country) {
                return res.status(400).json({message: "All fields are required"});
            }
            const categoriesExists = await Category.find({_id: {$in: categories}});
            if (categoriesExists.length !== categories.length) {
                return res.status(400).json({message: "One or more categories not found"});
            }
            const ingredientsExists = await Ingredient.find({_id: {$in: ingredients}});
            if (ingredientsExists.length !== ingredients.length) {
                return res.status(400).json({message: "One or more ingredients not found"});
            }
            const dish = await updateDish(id, {name, categories, price, description, ingredients, country});
            res.status(200).json(dish);
        } catch (error) {
            res.status(500).json({message: "Failed to update dish", error});
        }
    },

    deleteDish: async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const dish = await deleteDish(id);
            if (!dish) {
                return res.status(404).json({message: "Dish not found"});
            }
            res.status(200).json({message: "Dish deleted successfully"});
        } catch (error) {
            res.status(500).json({message: "Failed to delete dish", error});
        }
    }
}