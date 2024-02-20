const express = require('express')
const router = express.Router()

const { 
    updatePassword,
    userRegister 
} = require('../controllers/user.controllers')

router.post('/user', updatePassword)
router.post('/user', userRegister)

module.exports = router