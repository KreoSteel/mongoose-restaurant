import express from "express";
import { Request, Response } from "express";
import connectDB from "./config/db";
import ingredientsRoutes from "./routes/ingredientsControllers";
import dotenv from "dotenv";
import { parsedEnvVariables, validateEnvVariables } from "./config/variables";
import dishesRoutes from "./routes/dishes";
import categoriesRouter from "./routes/categories";
import ordersRoutes from "./routes/orders";
import cors from "cors";


dotenv.config();
validateEnvVariables();
const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});

app.use("/ingredients", ingredientsRoutes);
app.use("/dishes", dishesRoutes);
app.use("/categories", categoriesRouter);
app.use("/orders", ordersRoutes);

app.listen(parsedEnvVariables.PORT, () => {
    console.log(`Server is running on port ${parsedEnvVariables.PORT}`);
});