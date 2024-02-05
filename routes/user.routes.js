const express = require('express')
const router = express.Router()
const { getAllUsers } = require('./../controllers/user.controllers')

router.get('/api/users', getAllUsers)

module.exports = router