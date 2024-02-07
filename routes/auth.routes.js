const express = require('express')
const router = express.Router()

const { authUser } = require('../middleware/auth.middleware')

router.get('/authuser', authUser)

module.exports = router