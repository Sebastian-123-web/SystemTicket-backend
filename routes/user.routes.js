const express = require('express')
const router = express.Router()
const { getAllUsers } = require('./../controllers/user.controllers')

const { getAllUserM } = require('./../model/user_model')

///router.get('/api/users', getAllUsers)

router.get('/users', getAllUserM)

module.exports = router