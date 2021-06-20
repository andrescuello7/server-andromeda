const express = require('express')
const CollectionPublicacion = require('../collections/CollectionPublicacion')
const auth = require('../middleware/auth')
const router = express.Router()

//Metodos Get
router.get('/', CollectionPublicacion.Home)
router.get("/:idUsuario", CollectionPublicacion.ObtenerUsuario)
router.get("/usuario/:idPublicacion", CollectionPublicacion.ObtenerPublicacion)

//Metodos Post
router.post('/', auth, CollectionPublicacion.Post)

//Metodos Delete
router.delete('/:idDelete', auth, CollectionPublicacion.Delete)

//Metodos Put
router.put('/inclike/:idLike', auth, CollectionPublicacion.PonerLikes)
router.put('/quitlike/:idLike', auth, CollectionPublicacion.QuitarLikes)

module.exports = router;