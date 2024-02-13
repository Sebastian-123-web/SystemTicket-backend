const express = require('express')
const router = express.Router()

const { authUser } = require('../middleware/auth.middleware')

router.post('/authuser', authUser)

module.exports = router