let Slide = require('../models/slide.model')
let model=new Slide();
exports.Get=(req,res)=>{
    model.GetSlide((err, data)=>{
        res.send(data)
    })
}