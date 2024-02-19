const express = require('express')
const router = express.Router()

const { 
    createPassword,
    userRegister 
} = require('../controllers/user.controllers')

router.post('/user', createPassword)
router.post('/user', userRegister)

module.exports = router