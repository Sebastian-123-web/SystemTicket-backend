const {getAllUserM} = require('./../model/user_model')

const getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsersM()
        res.json(users)
    } catch (error) {
        console.error('Error al obtener los usuarios: ',error)
        res.status(500).json({error: 'Error interno del servidor'})
    }
}

module.exports = {
    getAllUsers
}