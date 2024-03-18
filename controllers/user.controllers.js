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

obtener los datos
validar email resgitrado
registro de usuario
registrar contraseña
mensaje de conformidad

*/

/* obtendo los datos del frontend y ejecuta las funciones involucradas */
const userRegister = async (req,res) => {
    const { user_name, user_lastname, user_photo, user_email, user_phone, user_annex, user_password } = req.body

    const id_user = await getIdUser(user_email)

    if(id_user[0]?.id_user){
        res.status(409).json({error:"El Email ya se encuentra registrado, ingrese uno diferente"})
    }else if(registerDB(user_name, user_lastname, user_photo, user_email, user_phone, user_annex)){
        const id_user = await getIdUser(user_email)
        encryptPassword(id_user[0]?.id_user,user_password,passwordRegisterDB)
        res.status(200).json({msg:'Usuario registrado'})
    }
}

/* registrar el usuario en la base de datos */
const registerDB = (user_name, user_lastname, user_photo, user_email, user_phone, user_annex) => {
    return new Promise((resolve,reject)=>{
        const querySQL = `INSERT INTO tbl_user (id_user, user_name, user_lastname, user_photo, user_email, user_phone, user_annex, user_domainuser, user_access) VALUES (NULL, '${user_name}', '${user_lastname}', '${user_photo}', '${user_email}', '${user_phone}', '${user_annex}', 'Ninguno', 'user')`
        connection.query(querySQL, (err,result)=>{
            if (err) reject(err)
            resolve(true)            
        })
    })
}

/* verifica la existencia del EMAIL y obtiene el ID del usuario*/
const getIdUser = (user_email) => {
    return new Promise((resolve,reject)=>{
        const querySQL = `SELECT id_user FROM tbl_user WHERE user_email='${user_email}'`
        connection.query(querySQL, (err, result) => {
            if(err) reject(err)
            resolve(result)
        })
    })
}

/* registrar contraseña encriptada en la Base de Datos */
const passwordRegisterDB = (id_user,password) => {
    return new Promise((resolve,reject) => {
        const querySQL = `INSERT INTO tbl_password (id_user, password) VALUES (${id_user}, '${password}')`
        connection.query(querySQL, (err, result) => {
            if(err) reject(err)
            resolve(true)
        })
    })
}

module.exports = {
    updatePassword,
    userRegister
}