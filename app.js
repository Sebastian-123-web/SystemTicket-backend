require('dotenv').config() // importamos variable de entorno
const express = require('express')
const app = express()

const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000 // traemos la variable PORT

//RUTAS
app.use('/api', require('./routes/auth.routes'))
app.use('/api', require('./routes/user.routes'))
//app.use('/api', require('./routes/ticket.routes'))

app.listen(PORT,()=>{
    console.log('Server running in', `http://localhost:${PORT}`)
})