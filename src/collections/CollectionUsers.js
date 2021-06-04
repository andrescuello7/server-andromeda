const Usuario = require("../models/Usuarios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.Post = async (req, res) => {
  const { email, password } = req.body;
  const validation = await Usuario.findOne({ email });
  try {
    if (validation) {
      return res.status(400).send("Error en validacion de email");
    }
    const salt = await bcrypt.genSalt(10);
    const encrypt = await bcrypt.hash(password, salt);
    const usuario = new Usuario({
      ...req.body,
      password: encrypt,
      CreateAdd: Date.now(),
    });
    await usuario.save();
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

exports.Put = async (req, res) => {
  const { idUser } = req.params;
  try {
    const actualizar = await Usuario.findOneAndUpdate({ _id: idUser }, req.body, { new: true });
    res.send(actualizar)
  } catch (error) {
    console.log(error);
    res.status(400).send("Error en la actualizacion de usuario");
  }
};

exports.PutDate = async (req, res) => {
  try {
    const { body, usuario } = req;
    const usuarioActualizado = await Usuario.findOneAndUpdate({ _id: usuario.id }, body, { new: true });
    res.send(usuarioActualizado)
  } catch (error) {
    console.log(error);
    res.status(400).send("Error en la actualizacion de usuario");
  }
};