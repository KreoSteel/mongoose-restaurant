import { Router } from "express";
import { categoriesControllers } from "../controllers/categoriesControllers";

const categoriesRouter = Router();

categoriesRouter.get("/", categoriesControllers.getCategories);
categoriesRouter.post("/", categoriesControllers.createCategory);
categoriesRouter.get("/:id", categoriesControllers.getCategoryById);
categoriesRouter.put("/:id", categoriesControllers.updateCategory);
categoriesRouter.delete("/:id", categoriesControllers.deleteCategory);


export default categoriesRouter;