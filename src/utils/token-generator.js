import jwt from "jsonwebtoken";
import "dotenv/config";

const secretKey = process.env.JWT_SECRET_KEY;

//Función para generar el token JWT
export const generateToken = (userData) => {
  //const payload
  const user = { id: userData.id };
  const expiration = { expiresIn: "1h" };

  return jwt.sign(user, secretKey, expiration);
};
