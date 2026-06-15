import express from "express";
import cors from "cors";
import bodyParser from "body-parser"; // Middleware para parsear JSON en las solicitudes
import dotenv from "dotenv"; // Cargar variables de entorno desde el archivo .env

import productsRouter from "./src/routers/products.router.js"; // Importar el controlador de productos

dotenv.config(); // Cargar las variables de entorno

const app = express(); // Crear una instancia de Express

app.use(cors()); // Middleware para habilitar CORS en todas las rutas desde Frontend
app.use(bodyParser.json()); // Middleware global para parsear JSON en las solicitudes

// Ruta de ejemplo para la página de inicio
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <title>Bienvenido</title>
      </head>
      <body>
        <h1>¡Bienvenido a mi API!</h1>
        <p>Servidor corriendo con Node.js y Express.</p>
      </body>
    </html>
  `);
});

// Prefijo para las rutas de productos
app.use("/api/products", productsRouter);

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
//const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
