import { UserModel } from "../models/mongoose/user.model.js";
import { signToken } from "../helpers/jwt.helper.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";


export const register = async (req, res) => {
  const { username, email, password, role, profile } = req.body;
  try {
    // TODO: crear usuario con password hasheada y profile embebido
    const hashedPassword = await hashPassword(password);
    const newUser = await UserModel.create({
      username,
      email,
      password: hashPassword,
      role,
      profile
    })
    return res.status(201).json({ msg: "Usuario registrado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // TODO: buscar user, validar password, firmar JWT y setear cookie httpOnly
    const loginUser = await UserModel.findOne({ username: username });
    const validPassword = await comparePassword(password, loginUser.password);
    if (!validPassword) {
      return res.status(401).json("Credenciales invalidas");
    }
    const token = generateToken(loginUser);
    res.cookie("token", token, {
      hhtpOnly: true,
      maxAge: 1000 * 60 * 60,
    });
    return res.status(200).json({ msg: "Usuario logueado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getProfile = async (req, res) => {
  try {
    // TODO: devolver profile del user logueado actualmente
    const currentUser = req.userLogged;
    return res.status(200).json({ data: profile });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};


export const logout = async (_req, res) => {
  res.clearCookie("token");
  return res.status(204).json({ msg: "Sesión cerrada correctamente" });
};
