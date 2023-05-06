const { pool, mssql } = require('../../connect')
let Order = require('../models/order.model')
let model = new Order();
exports.getlist = (req, res) => {
    model.getOrder((err, data) => {
        res.send( data )
    })
}

exports.Post=(req,res)=>{
    model.PostOrder(req.body,(err,data)=>{
        res.send(data)

    })
}

exports.DetailOrder=(req,res)=>{
    model.postDetailOrder(req.body,(err,data)=>{
        res.send(data)
    })
}

exports.PutAcceptOrder=(req,res)=>{
    model.AcceptOrder(req.body,(err,data)=>{
        res.send(data)
    })
}


//thừa
exports.Delete=(req,res)=>{
    model.DeleteProduct(req.body,(err,data)=>{
        res.send(data)
    })
}
exports.Find=(req,res)=>{
    model.FindProduct(req.query.Id,(err,data)=>{
        res.send(data[0])
    })
}


exports.FindA=(req,res)=>{
    model.FindAll(req.query.name,(err,data)=>{
        res.send(data)
        console.log("có lỗi không", err,req.query.name)
    })
}

exports.GetCategory=(req, res)=>{
    model.GetProductByCategory(req.query.Id,(err,data)=>{
        res.send(data)
    })
}
exports.AdminDetailOrder=(req,res)=>{
    model.GetDetailOrder(req.query.Id,(err,data)=>{
        res.send(data)
 })
}
exports.AdminTotalOrder=(req,res)=>{
    model.ThongKe((err, data) => {
        res.send( data )
    })
}
exports.AdminTotalMoney=(req,res)=>{
    model.TotalMoney((err, data) => {
        res.send( data[0] )
    })
}