const express = require('express')
const app = express()

const cors = require('cors')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: true}));

require('dotenv').config() // importamos variable de entorno
const PORT = process.env.PORT || 3000 // traemos la variable PORT

app.use('/', require('./routes/user.routes'))

app.listen(PORT,()=>{
    console.log('Servidor corriendo', `http://localhost:${PORT}`)
})