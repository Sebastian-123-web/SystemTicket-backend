const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const connection = require('../config/database_config')

const secretKey = process.env.SECRET_KEY

// OBTENERMOS LOS 
const authUser = (req,res) => {
    const {user_email,passClient} = req.body
    const sql = `SELECT id_user, user_access FROM tbl_user WHERE user_email='${user_email}'`

    connection.query(sql, async(err, dataUser)=>{
        if(err) throw err
        const password = await getPassword(dataUser[0].id_user)
        if ( await validatePassword(password,passClient)) {
            const token = jwt.sign({id:dataUser[0].id_user},secretKey,{expiresIn:'1h'})
            return res.status(200).json({token:token, id_user:dataUser[0].id_user, access:dataUser[0].user_access})
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
    try {
        const passValidateOrInvalidate = new Promise((resolve,reject)=>{ //INSTANCIAMOS LA PROMESA PARA EL ASYNC Y AWAIT ESPEREN LA RESPUESTA
            bcrypt.compare(passClient,passDB, (err,result)=>{
                if(err) reject(err)
                resolve(result)
            })
        })
        return passValidateOrInvalidate
    } catch (error) {
        console.error(error)
        throw error
    }
}

module.exports = { authUser }