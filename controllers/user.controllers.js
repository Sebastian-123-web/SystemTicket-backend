const connection = require('../config/database_config')
const bcrypt = require('bcrypt')


/*
*****************************************
        RACTUALIZAR CONTRASEÑA
*****************************************
*/

const createPassword = (req, res) => {
    const { password,id_user } = req.body
    const msg = encryptPassword(password,id_user)
    return res.status(200).json({msg:msg})
}

// ENCRIPTAMOS LA CONTRASEÑA
const encryptPassword = (password,id_user) => {
    bcrypt.hash(password,10, (err, hashedPassword)=>{
        if(err) throw err
        const msg = savePasswordDB(id_user,hashedPassword) //GUARDAR EN BASE DE DATOS
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


/*
*****************************************
        REGISTRO DE USUARIO
*****************************************
*/
const userRegister = (req,res) => {
    const { user_name, user_lastname, user_photo, user_email, user_phone, user_annex, user_domainuser } = req.body
    const querySQL = `INSERT INTO tbl_user (id_user, user_name, user_lastname, user_photo, user_email, user_phone, user_annex, user_domainuser, user_access) VALUES (NULL, '${user_name}', '${user_lastname}', '${user_photo}', '${user_email}', '${user_phone}', '${user_annex}', '${user_domainuser}', 'user')`
    connection.query(querySQL, (err,result)=>{
        if (err) throw err
        res.status(200).json({msg: 'Usuario agregado'})
    })
}

const getIdUser = (user_email) => {
    const querySQL = `SELECT id_user FROM tbl_user WHERE user_email='${user_email}'`
    connection.query(querySQL, (err, result) => {
        if(err) throw err
        return result
    })
}

const passwordUserRegister = () => {
    const querySQL = `INSERT INTO tbl_password (id_user, password) VALUES (${}, '${}')`
    connection.query(querySQL, (err, result) => {
        if(err) throw result
        
    })
}



module.exports = {
    createPassword,
    userRegister
}