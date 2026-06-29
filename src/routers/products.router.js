import { Router } from "express";
const router = Router();

import {
  getAllProducts,
  getProductById,
  createProducts,
  deleteProducts,
  getProductBySku,
  updateProducts,
} from "../controllers/products.controller.js";

import { authentication } from "../middlewares/authentication.js";

// Controladores para manejar las operaciones de productos
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.get("/sku/:idSku", getProductBySku); // Ruta para obtener un producto por su SKU, mas facilidad para el usuario, no es necesario recordar el ID del producto, solo su SKU que es mas fácil de recordar y esta relacionado con el producto
router.post("/create", authentication, createProducts);
router.put("/update/:id", authentication, updateProducts);
router.delete("/:id", authentication, deleteProducts);

export default router;
