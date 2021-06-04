const Usuario = require("../models/Usuarios");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

//Metodo para ver datos del Usuario
exports.Get = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id);
    res.json({ usuario });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error en creacion de Usuario");
  }
};

//Metodo para iniciar sesion
exports.Post = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ msg: errores.array() });
  }
  const { email, password } = req.body;
  try {
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: "usuario no existe" });
    }
    const PassCorrect = await bcrypt.compare(password, usuario.password);
    if (!PassCorrect) {
      return res.status(400).json({ msg: "password incorrecto" });
    }
    const payload = {
      usuario: {
        id: usuario.id,
      },
    };
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) {
          throw error;
        }
        res.send(token);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send("Error en creacion de Usuario");
  }
};
