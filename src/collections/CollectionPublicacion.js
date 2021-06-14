const ModelPublic = require('../models/publicacion')
const Usuarios = require('../models/Usuarios')

//Metodo para ver publicacion
exports.Home = async (req, res) => {
    try {
        const DataBaseOfHome = await ModelPublic.find();
        res.send(DataBaseOfHome)
    } catch (error) {
        console.log(error)
        res.status(400).send('Error en metodo de lectura')
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
            creador: req.usuario.id,
            CreateAdd: Date.now()
        })
        await DataBaseOfHome.save()
        res.send(DataBaseOfHome)
    } catch (error) {
        console.log(error)
        res.status(400).send('error en posteo de publicacion')
    }
};

//Metodo para eliminar publicacion
exports.Delete = async (req, res) => {
    const { idDelete } = req.params;
    try {
        const DataBaseOfHome = await ModelPublic.findById(idDelete)
        await DataBaseOfHome.remove()
        res.send(DataBaseOfHome)
    } catch (error) {
        console.log(error)
        res.status(400).send('error en eliminar publicacion')
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