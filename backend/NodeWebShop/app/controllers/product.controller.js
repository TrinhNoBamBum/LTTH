const { pool, mssql } = require('../../connect')
//onst circularJSON = require('json-stringify-safe');
const circularJSON = require('circular-json');
let Product = require('../models/product.model')
let model = new Product();
exports.getlist = (req, res) => {
    model.getAll((err, data) => {
        res.send( data )
    })
}


exports.Post = (req, res) => {
    model.PostProduct(req, (err, data) => {
        const cleanedData = circularJSON.stringify(data);
        res.send(cleanedData);
    });
}

exports.controllerComment=(req,res)=>{
    model.ModelComment(req.body,(err,data)=>{
        res.send(data)
    })
}

// exports.Post=(req,res)=>{
//     model.PostProduct(req,(err,data)=>{
//         res.send(data)

//     })
// }


exports.Put=(req,res)=>{
    model.PutProduct(req.body,(err,data)=>{
        res.send(data)
    })
}
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
exports.GetPaginationProduct=(req,res)=>{
    model.PaginationProduct(req.query.page,(err,data)=>{
        res.send(data)
        
    })
}
exports.getControllerComment=(req, res)=>{
    model.getModelComment(req.query.Id,(err,data)=>{
        res.send(data)
    })
}

exports.getControllerCategory=(req,res)=>{
    model.getModelCategory((err,data)=>{
        res.send(data)
    })
}