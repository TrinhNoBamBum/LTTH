let Cart = require('../models/cart.model')
let model=new Cart();
exports.Post=(req,res)=>{
    model.PostCart(req.body,(err,data)=>{
        res.send(data)
    })
}
exports.Get=(req,res)=>{
    model.GetCart(req.query.Id,(err, data)=>{
        res.send(data)
    })
}
exports.Delete=(req,res)=>{
    model.DeleteCart(req.body,(err,data)=>{
        res.send(data)
    })
}
exports.DeleteAll=(req,res)=>{
    model.DeleteAllCart(req.body,(err,data)=>{
        res.send(data)
    })
}