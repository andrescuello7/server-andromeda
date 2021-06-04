const mongoose = require('mongoose')

const Usuario = mongoose.Schema({
    usuario:{
        type: String,
        required: true,
        tim: true
    },
    email:{
        type: String,
        required: true,
        tim: true
    },
    password:{
        type: String,
        required: true,
        tim: true
    },
    facebook:{
        type: String
    },
    celular:{
        type: String
    },
    estado:{
        type: String
    },
    imagen:{
        type: String
    },
    CreateAdd:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Usuario', Usuario)