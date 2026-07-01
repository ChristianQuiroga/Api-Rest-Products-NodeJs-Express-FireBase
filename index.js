import dotenv from "dotenv"; // Cargar variables de entorno desde el archivo .env
dotenv.config(); // Cargar las variables de entorno

// Importar app
import app from "./app.js";

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
//const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
