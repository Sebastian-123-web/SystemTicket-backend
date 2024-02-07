const express = require('express')
const router = express.Router()

const { getAllUserM } = require('./../model/user_model')
const { authUser } = require('../middleware/auth.middleware')

router.post('/auth', authUser)

router.get('/users', getAllUserM)

module.exports = router