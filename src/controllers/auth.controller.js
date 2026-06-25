import { generateToken } from "../utils/token-generator.js";

const defaultUser = {
  id: 1,
  email: "user@email.com",
  password: "strongPass123",
};

export const login = (req, res) => {
  const { email, password } = req.body ?? {}; // no romper el server si esta indefinido usar ?? {}

  //Verificar credenciales del usuario
  if (!email || !password) {
    return res.status(400).json({
      message: "Email y password son obligatorios",
    });
  }

  const isValidator =
    email === defaultUser.email && password === defaultUser.password;

  if (!isValidator) {
    return res.status(401).json({
      message: "Credenciales inválidas",
    });
  }

  //Ejemplo usuario autenticado, Armamos un objeto user.
  const user = {
    id: defaultUser.id,
    email: defaultUser.email,
  };

  const token = generateToken(user);

  return res.json({ token });
};
