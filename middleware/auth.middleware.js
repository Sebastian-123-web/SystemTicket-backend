const jwt = require('jsonwebtoken')

const connection = require('../config/database_config')

const secretKey = process.env.SECRET_KEY


const authUser = (req,res) => {
    const passClient = 'SF2021.'
    const sql = `SELECT id_user,user_name,user_lastname FROM tbl_user WHERE user_email='rbanagasta@transberperu.com'`

    connection.query(sql, async(err, dataUser)=>{
        if(err) throw err
        const password = await getPassword(dataUser[0].id_user)
        if (validatePassword(password,passClient)) {
            const token = jwt.sign({id:dataUser[0].id_user},secretKey,{expiresIn:'1h'})
            return res.status(200).json({token})
        }
        res.status(401).json({message: 'Credenciales invalidas'})
    })
}


//OBTENEMOS LA CONTRASEÑA CON EL ID DEL USUARIO
const getPassword = (id_user) => {
    try {
        const result = new Promise((resolve,reject)=>{
            connection.query(`SELECT password FROM tbl_password WHERE id_user=${id_user}`, (err, result)=>{
                if(err) reject(err)
                resolve(result[0].password)
            })
        })
        return result
    } catch (error) {
        console.error(error)
        throw error
    }
}


// VALIDAMOS QUE LA CONTRASEÑA QUE INGRESO EL USUARIO SEA IGUAL AL DE LA BASE DE DATOS
const validatePassword = (passDB,passClient) => {
    if(passDB==passClient){
        return true
    }
    return false
}

module.exports = { authUser }