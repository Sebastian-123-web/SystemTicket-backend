const jwt = require('jsonwebtoken')

const connection = require('../config/database_config')

const secretKey = process.env.SECRETKEY

const authUser = (req,res) => {
    connection.query(`SELECT id_user,user_name,user_lastname FROM tbl_user WHERE user_email='rbanagasta@transberperu.com'`, (err, dataUser, fields)=>{
        if(!err){
            const passClient = 'SF2021.'
            const validatePass = validatePassword(dataUser[0].id_user)
            console.log(validatePass)
            res.status(200).json(dataUser)
        }else{
            console.log(err)
        }
    })
}

const validatePassword = (id_user) => {
    connection.query(`SELECT password FROM tbl_password WHERE id_user=${id_user}`, (err, result)=>{
        
    })
}

module.exports = { authUser }