const express = require('express')
const CollectionAuth = require('../collections/CollectionAuth')
const auth = require('../middleware/auth')
const router = express.Router()

//Metodos Get
router.get('/', auth, CollectionAuth.Get)

//Metodos Post
router.post('/', CollectionAuth.Post)

module.exports = router;