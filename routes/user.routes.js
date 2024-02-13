const express = require('express')
const router = express.Router()

const { createPassword } = require('../controllers/user.controllers')

router.post('/user', createPassword)

module.exports = router