import Router from "express";

import userController from "../controllers/userController.js";
import productController from "../controllers/productController.js";
import cartController from "../controllers/cartController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// homepage
router.get("/", (req, res) => {});

router.use("/users", authMiddleware, userController);
router.use("/products", productController);
router.use("/cart", authMiddleware, cartController);

export default router;
