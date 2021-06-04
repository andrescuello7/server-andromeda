const express = require('express')
const CollectionUsers = require('../collections/CollectionUsers')
const router = express.Router()
const auth = require('../middleware/auth')

//Metodos Post
router.post('/', CollectionUsers.Post)

//Metodos Put
router.put('/', auth, CollectionUsers.PutDate)
router.put('/:idUser', auth, CollectionUsers.Put)

module.exports = router;