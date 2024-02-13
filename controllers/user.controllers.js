const connection = require('../config/database_config')
const bcrypt = require('bcrypt')

const createPassword = (req, res) => {
    const { password,id_user } = req.body
    const msg = encryptPassword(password,id_user)
    return res.status(200).json({msg:msg})
}

// ENCRIPTAMOS LA CONTRASEÑA
const encryptPassword = (password,is_user) => {
    bcrypt.hash(password,10, (err, hashedPassword)=>{
        if(err) throw err
        const msg = savePasswordDB(is_user,hashedPassword) //GUARDAR EN BASE DE DATOS
        return msg
    })
}

// ACTUALIZA LA CONTRASEÑA ENCRIPTADA EN LA BASE DE DATOS
const savePasswordDB = (id_user,password) => {
    const querySQL = `UPDATE tbl_password SET password = '${password}' WHERE tbl_password.id_user = ${id_user}`
    connection.query(querySQL, (err, result)=>{
        if(err) throw err
        return 'Contraseña Actualizada'
    })
}

module.exports = {
    createPassword
}