const express = require('express')

const connection = require('./../config/database_config')

const UserModel = {
    getAllUsersM:async () => {
        return await connection.query("SELECT * FROM tbl_user", (err,rows)=>{
            if(err) throw err
            console.log(rows)
            JSON.stringify(rows)
        })
    }
}

module.exports = {UserModel}