import { Request, Response } from "express";
import { getCategories, createCategory, getCategoryById, updateCategory, deleteCategory } from "../services/categories";
import { defineError } from "../utils/error";
import Dish from "../models/dishes";

export const categoriesControllers = {
    getCategories: async (req: Request, res: Response) => {
        try {
            const { page, itemsPerPage } = req.query;
            const categories = await getCategories(Number(page), Number(itemsPerPage));
            res.status(200).json(categories);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            res.status(500).json({ message: defineError(errorMessage) });
        }
    },

    getCategoryById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const category = await getCategoryById(id);
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            res.status(200).json(category);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            res.status(500).json({ message: defineError(errorMessage) });
        }
    },


    createCategory: async (req: Request, res: Response) => {
        try {
            const { name, description } = req.body;
            if (!name || !description) {
                return res.status(400).json({ message: "Name and description are required" });
            }
            const category = await createCategory({ name, description });
            res.status(201).json(category);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            res.status(500).json({ message: defineError(errorMessage) });
        }
    },


    updateCategory: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { name, description } = req.body;
            if (!name || !description) {
                return res.status(400).json({ message: "Name and description are required" });
            }
            const category = await updateCategory(id, { name, description });
            res.status(200).json(category);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            res.status(500).json({ message: defineError(errorMessage) });
        }
    },


    deleteCategory: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(404).json({ message: "Category not found" });
            }
            const dishesUsingCategory = await Dish.find({ categories: id });
            if (dishesUsingCategory.length > 0) {
                const dishIds = dishesUsingCategory.map(dish => dish._id).join(', ');
                return res.status(400).json({ message: `Cannot delete category. It is used by the following dishes: ${dishIds}` });
            }
            const category = await deleteCategory(id);
            res.status(200).json(category);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            res.status(500).json({ message: defineError(errorMessage) });
        }
    }
}