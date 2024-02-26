const connection = require('../config/database_config')
const bcrypt = require('bcrypt')


/*
***********************************************
        ACTUALIZAR CONTRASEÑA
***********************************************
*/
const updatePassword = async (req, res) => {
    const { password,id_user } = req.body
    if(!await encryptPassword(id_user,password,savePasswordInDB)){
        return res.json({msg:'No se actualizo'})
    }
    res.status(200).json({msg:'Contraseña Actualizada'})
}

// ACTUALIZA LA CONTRASEÑA ENCRIPTADA EN LA BASE DE DATOS
const savePasswordInDB = (id_user,password) => {
    try{
        return new Promise((resolve,reject)=>{
            const querySQL = `UPDATE tbl_password SET password = '${password}' WHERE tbl_password.id_user = ${id_user}`
            connection.query(querySQL, (err, result)=>{
                if(err) reject(err)
                //console.log("salio true")
                resolve(true)
            })
        })
    }catch(err){
        console.error("Error: ",err)
        throw err
    }
}


/*
***********************************************
    ENCRIPTAR CONTRASEÑA ---> REUTILIZABLE
***********************************************
*/
const encryptPassword = (id_user,password,sqlFunction) => {
    try {
        return new Promise((resolve, reject)=>{
            bcrypt.hash(password,10, (err, hashedPassword)=>{
                if(err) reject(err)
                resolve(sqlFunction(id_user,hashedPassword))
            })
        })
    } catch (error) {
        console.log("Error: ", error)
        throw error
    }
}



/*
***********************************************
            REGISTRO DE USUARIO
***********************************************
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

const userPasswordRegister = (password) => {
    const id_user = getIdUser
    const querySQL = `INSERT INTO tbl_password (id_user, password) VALUES (${id_user}, '${password}')`
    connection.query(querySQL, (err, result) => {
        if(err) throw result
        
    })
}


module.exports = {
    updatePassword,
    userRegister
}