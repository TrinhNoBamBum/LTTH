const { pool, mssql } = require('../../connect')
let Login = require('../models/login.model')
let model = new Login();
exports.getUC = (req, res) => {
    model.getUser((err, data) => {
        res.send(data)
    })
}
exports.Post=(req,res)=>{
    model.register(req.body,(err,data)=>{
        res.send(data)

    })
}

exports.Delete=(req,res)=>{
    model.DeleteInfoUser(req.query.Id,(err,data)=>{
        res.send(data)
    })
}