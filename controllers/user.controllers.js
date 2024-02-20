const connection = require('../config/database_config')
const bcrypt = require('bcrypt')


/*
*****************************************
        ACTUALIZAR CONTRASEÑA
*****************************************
*/
const updatePassword = (req, res) => {
    const { password,id_user } = req.body
    console.log('1')
    const passwordEncrypt = encryptPassword(password)
    console.log('3')
    console.log(passwordEncrypt)
    if(savePasswordInDB(id_user,passwordEncrypt)){
        res.status(200).json({msg:'Contraseña Actualizada'})
    }
    res.json({msg:'No se actualizo'})
}

// ENCRIPTAMOS LA CONTRASEÑA
const encryptPassword = (password) => {
    bcrypt.hash(password,10, (err, hashedPassword)=>{
        if(err) throw err
        //console.log(hashedPassword)
        console.log('2')
        return hashedPassword
    })
}

// ACTUALIZA LA CONTRASEÑA ENCRIPTADA EN LA BASE DE DATOS
const savePasswordInDB = (id_user,password) => {
    const querySQL = `UPDATE tbl_password SET password = '${password}' WHERE tbl_password.id_user = ${id_user}`
    //console.log(querySQL)
    connection.query(querySQL, (err, result)=>{
        if(err) throw err
        return true
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

const userPasswordRegister = () => {
    const id_user = getIdUser
    const querySQL = `INSERT INTO tbl_password (id_user, password) VALUES (${id_user}, '')`
    connection.query(querySQL, (err, result) => {
        if(err) throw result
        
    })
}


module.exports = {
    updatePassword,
    userRegister
}