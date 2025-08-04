import { Request, Response } from "express";
import { createIngredient, deleteIngredient, getIngredientById, getIngredients, updateIngredient } from "../services/ingredients";


const IngredientsController = {
    getIngredients: async (req: Request, res: Response) => {
        try {
            const {page, limit} = req.query;
            const ingredients = await getIngredients(Number(page), Number(limit));
            res.status(200).json(ingredients);
        } catch (error) {
            res.status(500).json({message: "Failed to get ingredients", error});
        }
    },


    createIngredient: async (req: Request, res: Response) => {
        try {
            const {name, price, stock} = req.body;
            if (!name || !price) {
                return res.status(400).json({message: "Name and price are required"});
            }
            const ingredient = await createIngredient(name, price, stock);
            res.status(201).json(ingredient);
        } catch (error) {
            res.status(500).json({message: "Failed to create ingredient", error});
        }
    },

    getIngredientById: async (req: Request, res: Response) => {
        try {
            if (!req.params.id) {
                return res.status(400).json({message: "Id is required"});
            }
            const {id} = req.params;
            const ingredient = await getIngredientById(id);
            if (!ingredient) {
                return res.status(404).json({message: "Ingredient not found"});
            }
            res.status(200).json(ingredient);
        } catch (error) {
            res.status(500).json({message: "Failed to get ingredient by id", error});
        }
    },

    updateIngredient: async (req: Request, res: Response) => {
        try {
            if (!req.params.id) {
                return res.status(400).json({message: "Id is required"});
            }
            const {name, price, stock} = req.body;
            if (!name || !price) {
                return res.status(400).json({message: "Name and price are required"});
            }
            const ingredient = await updateIngredient(req.params.id, name, price, stock);
            res.status(200).json(ingredient);
        } catch (error) {
            res.status(500).json({message: "Failed to update ingredient", error});
        }
    },
    
    deleteIngredient: async (req: Request, res: Response) => {
        try {
            if (!req.params.id) {
                return res.status(400).json({message: "Id is required"});
            }
            const {id} = req.params;
            const ingredient = await deleteIngredient(id);
            res.status(200).json(ingredient);
        } catch (error) {
            res.status(500).json({message: "Failed to delete ingredient", error});
        }
    }

}

export default IngredientsController;