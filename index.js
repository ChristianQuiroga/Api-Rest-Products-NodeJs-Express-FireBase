import express from "express";
import cors from "cors";
//import bodyParser from "body-parser"; // Middleware para parsear JSON en las solicitudes
import dotenv from "dotenv"; // Cargar variables de entorno desde el archivo .env

import productsRouter from "./src/routers/products.router.js"; // Importar el controlador de productos

dotenv.config(); // Cargar las variables de entorno

const app = express(); // Crear una instancia de Express

app.use(cors()); // Middleware para habilitar CORS en todas las rutas desde Frontend
//app.use(bodyParser.json()); // Middleware global para parsear JSON en las solicitudes

// Ruta de ejemplo para la página de inicio
// app.get("/", (req, res) => {
//   res.send(`
//     <!DOCTYPE html>
//     <html lang="es">
//       <head>
//         <meta charset="UTF-8" />
//         <title>Bienvenido</title>
//       </head>
//       <body>
//         <h1>¡Bienvenido a mi API!</h1>
//         <p>Servidor corriendo con Node.js y Express.</p>
//       </body>
//     </html>
//   `);
// });
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>API Proyecto Final</title>

        <style>
          body {
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
            background-color: #f4f6f8;
            color: #333;
          }

          .container {
            max-width: 900px;
            margin: 60px auto;
            padding: 40px;
            background-color: #ffffff;
            border-radius: 14px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          }

          h1 {
            color: #1f3c88;
            margin-bottom: 10px;
          }

          .description {
            font-size: 1.1rem;
            color: #555;
            margin-bottom: 30px;
          }

          .badge {
            display: inline-block;
            background-color: #e6f4ea;
            color: #137333;
            padding: 8px 14px;
            border-radius: 20px;
            font-weight: bold;
            margin-bottom: 20px;
          }

          .routes {
            margin-top: 25px;
          }

          .route {
            background-color: #f1f3f4;
            padding: 14px 18px;
            border-radius: 8px;
            margin-bottom: 12px;
            border-left: 5px solid #1f3c88;
          }

          .method {
            font-weight: bold;
            color: #1f3c88;
            margin-right: 10px;
          }

          footer {
            margin-top: 35px;
            color: #777;
            font-size: 0.95rem;
          }
        </style>
      </head>

      <body>
        <main class="container">
          <span class="badge">API en funcionamiento</span>

          <h1>API REST - Proyecto Final Node.js</h1>

          <p class="description">
            Esta API fue desarrollada con Node.js y Express como parte del proyecto final del curso.
          </p>

          <section>
            <h2>Información del proyecto</h2>
            <p><strong>Servidor:</strong> Node.js</p>
            <p><strong>Framework:</strong> Express</p>
            <p><strong>Autor:</strong> Christian Quiroga Enriquez</p>
          </section>

          <section class="routes">
            <h2>Endpoints disponibles</h2>

            <div class="route">
              <span class="method">GET</span>
              <span>/</span>
            </div>

            <div class="route">
              <span class="method">GET</span>
              <span>/api/products</span>
            </div>

            <div class="route">
              <span class="method">POST</span>
              <span>/api/products</span>
            </div>

            <div class="route">
              <span class="method">PUT</span>
              <span>/api/products/:id</span>
            </div>

            <div class="route">
              <span class="method">DELETE</span>
              <span>/api/products/:id</span>
            </div>
          </section>

          <footer>
            Proyecto final de curso - Backend con Node.js y Express
          </footer>
        </main>
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
