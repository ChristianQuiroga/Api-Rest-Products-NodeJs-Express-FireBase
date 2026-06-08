import { Router } from "express";
const router = Router();

import {
  getAllProducts,
  getProductById,
  createProducts,
  deleteProducts,
} from "../controllers/products.controller.js";

// Controladores para manejar las operaciones de productos
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/create", createProducts);
router.delete("/:id", deleteProducts);

export default router;
