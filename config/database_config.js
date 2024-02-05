const mysql = require('mysql')

require('dotenv').config()
const HOST = process.env.DB_HOST
const USER  = process.env.DB_USER
const PASSWORD = process.env.DB_PASSWORD
const DATABASE = process.env.DB_DATABASE

const connection = mysql.createConnection({
    host : HOST,
    user : USER,
    password : PASSWORD,
    database : DATABASE
})

connection.connect( err => {
    if(err){
        console.log('Error al conectar con la base de datos', err)
    }else{
        console.log('Conexion exitosa a la base de datos')
    }
})

module.exports = connection