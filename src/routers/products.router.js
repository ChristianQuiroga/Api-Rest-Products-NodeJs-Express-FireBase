import { Router } from "express";
const router = Router();

import {
  getAllProducts,
  getProductById,
  createProducts,
  deleteProducts,
  getProductBySku,
} from "../controllers/products.controller.js";

// Controladores para manejar las operaciones de productos
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.get("/sku/:idSku", getProductBySku); // Ruta para obtener un producto por su SKU, mas facilidad para el usuario, no es necesario recordar el ID del producto, solo su SKU que es mas fácil de recordar y esta relacionado con el producto
router.post("/create", createProducts);
router.delete("/:id", deleteProducts);

export default router;
