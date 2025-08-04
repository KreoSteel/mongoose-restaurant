import { Router } from "express";
import { dishesControllers } from "../controllers/dishesControllers";

const dishesRouter = Router();

dishesRouter.get("/", dishesControllers.getDishes);
dishesRouter.post("/", dishesControllers.createDish);
dishesRouter.get("/:id", dishesControllers.getDishById);
dishesRouter.put("/:id", dishesControllers.updateDish);
dishesRouter.delete("/:id", dishesControllers.deleteDish);

export default dishesRouter;