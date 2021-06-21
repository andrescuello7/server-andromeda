const ModelPublic = require("../models/publicacion");
const Usuarios = require("../models/Usuarios");

//Metodo para ver publicacion
exports.Home = async (req, res) => {
  try {
    const DataBaseOfHome = await ModelPublic.find();
    res.send(DataBaseOfHome);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error en metodo de lectura");
  }
};

//Metodo para subir publicacion
exports.Post = async (req, res) => {
  const { titulo, contenido } = req.body;
  try {
    const DataBaseOfHome = new ModelPublic({
      ...req.body,
      titulo,
      contenido,
      likes: 0,
      creador: req.usuario.id,
      CreateAdd: Date.now(),
    });
    await DataBaseOfHome.save();
    res.send(DataBaseOfHome);
  } catch (error) {
    console.log(error);
    res.status(400).send("error en posteo de publicacion");
  }
};

//Put comentarios
exports.PonerCometarios = async (req, res) => {
  const { idComentario } = req.params;
  const { comentarios } = req.body;
  try {
    const final = await ModelPublic.findByIdAndUpdate(
      { _id: idComentario },
      { $push: { comentarios } },
      { new: true }
    );
    res.send(final);
  } catch (error) {
    console.log(error);
  }
};

exports.PonerLikes = async (req, res) => {
  const { idLike } = req.params;
  const { likes } = req.body;
  try {
    const final = await ModelPublic.findByIdAndUpdate(
      { _id: idLike },
      { $inc: { likes: 1 } },
      { new: true }
    );
    res.send(final);
  } catch (error) {
    console.log(error);
  }
};

exports.QuitarLikes = async (req, res) => {
  const { idLike } = req.params;
  const { likes } = req.body;
  try {
    const final = await ModelPublic.findByIdAndUpdate(
      { _id: idLike },
      { $inc: { likes: -1 } },
      { new: true }
    );
    res.send(final);
  } catch (error) {
    console.log(error);
  }
};

//Metodo para eliminar publicacion
exports.Delete = async (req, res) => {
  const { idDelete } = req.params;
  try {
    const DataBaseOfHome = await ModelPublic.findById(idDelete);
    await DataBaseOfHome.remove();
    res.send(DataBaseOfHome);
  } catch (error) {
    console.log(error);
    res.status(400).send("error en eliminar publicacion");
  }
};

//Metodo para obtener datos del usuario
exports.ObtenerUsuario = async (req, res) => {
  const { idUsuario } = req.params;
  const packs = await Usuarios.find({ _id: idUsuario });
  res.send(packs);
};

exports.ObtenerPublicacion = async (req, res) => {
  const { idPublicacion } = req.params;
  const packs = await ModelPublic.find({ creador: idPublicacion });
  res.send(packs);
};
