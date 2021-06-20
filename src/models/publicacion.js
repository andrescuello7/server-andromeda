const mongoose = require('mongoose')

const DataBaseHome = mongoose.Schema({
    contenido:{
        type: String,
        required: true
    },
    provincia:{
        type: String
    },
    perfil:{
        type: String
    },
    flyer:{
        type: String,
        required: true
    },
    creador:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario'
    },
    proveedor:{
        type: mongoose.Schema.Types.String,
        ref: 'usuario'
    },
    comentarios: [{
        comentario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'pack'
        } 
    }],
    CreateAdd:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('publicacion', DataBaseHome)