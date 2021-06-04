const mongoose = require('mongoose')

const DataBaseHome = mongoose.Schema({
    titulo:{
        type: String,
        required: true
    },
    contenido:{
        type: String,
        required: true
    },
    perfil:{
        type: String
    },
    imagenPublicada:{
        type: String
    },
    creador:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario'
    },
    proveedor:{
        type: mongoose.Schema.Types.String,
        ref: 'usuario'
    },
    CreateAdd:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('publicacion', DataBaseHome)