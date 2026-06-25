import jwt from "jsonwebtoken"; //Sirve para verificar o generar tokens JWT.
import "dotenv/config"; //Carga automáticamente las variables del archivo .env, por ejemplo:

const secretKey = process.env.JWT_SECRET_KEY;

// Middleware para verificar el token JWT
export const authentication = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; //Esto busca el header Authorization, Thunder o postman lo envían asi : Authorization: Bearer TU_TOKEN_AQUÍ.  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI...

  if (!token)
    return res.status(401).json({
      ////401 → no hay token
      message: "No autorizado. Token requerido",
    });

  jwt.verify(token, secretKey, (err) => {
    if (err)
      return res.status(403).json({
        //403 → token inválido o vencido
        message: "Token inválido o expirado",
      });

    //req.user = decodedUser;

    next(); //next() significa: “seguí con la siguiente función o con el controlador final de la ruta”.
  });
};
