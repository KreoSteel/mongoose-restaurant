import { Router } from "express";
import { ordersControllers } from "../controllers/ordersControllers";

const router = Router();

router.post("/", ordersControllers.createOrder);
router.get("/", ordersControllers.getOrders);
router.patch("/:id/status", ordersControllers.changeOrderStatus);
router.patch("/:id/dishes/add", ordersControllers.addItemToOrder);
router.patch("/:id/dishes/remove", ordersControllers.removeItemFromOrder);
router.delete("/:id", ordersControllers.deleteOrder);

export default router;
