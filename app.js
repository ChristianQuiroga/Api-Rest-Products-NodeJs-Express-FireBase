import express from "express";
import cors from "cors";
//import bodyParser from "body-parser"; // Middleware para parsear JSON en las solicitudes
import dotenv from "dotenv"; // Cargar variables de entorno desde el archivo .env

import productsRouter from "./src/routers/products.router.js"; // Importar el controlador de productos
import authRouter from "./src/routers/auth.router.js"; // Importar el controlador de auth
import { getHome } from "./src/controllers/home.controller.js"; //exportación nombrada va entre {}

dotenv.config(); // Cargar las variables de entorno

const app = express(); // Crear una instancia de Express

app.use(cors()); // Middleware para habilitar CORS en todas las rutas desde Frontend
app.use(express.json());
//app.use(bodyParser.json()); // Middleware global para parsear JSON en las solicitudes

// Ruta de ejemplo para la página de inicio
app.get("/", getHome);

// Prefijo para las rutas de productos, login
app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

export default app;
