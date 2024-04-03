const express = require('express')
const router = express.Router()

// FUNCIONES PARA AGREGAR A LAS RUTAS



// RUTAS
router.post('/ticket/create/:user_name',laFuncion)
router.get('/ticket/:user_name',laFuncion)


module.exports = router