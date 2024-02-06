const connection = require('./../config/database_config')

const getAllUserM = (req,res) => {
    connection.query('SELECT * FROM tbl_user', (err, users,fields)=>{
        if(!err){
            res.status(200).json(users)
        }else{
            console.log(err)
        }
    })
}

module.exports = {
    getAllUserM
}