import { Router } from "express";
import IngredientsController from "../controllers/ingredientsController";

const router = Router();

router.post("/", IngredientsController.createIngredient);
router.get("/", IngredientsController.getIngredients);
router.get("/:id", IngredientsController.getIngredientById);
router.put("/:id", IngredientsController.updateIngredient);
router.delete("/:id", IngredientsController.deleteIngredient);

export default router;
