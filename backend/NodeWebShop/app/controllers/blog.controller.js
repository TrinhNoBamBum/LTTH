const { pool, mssql } = require('../../connect')
let Blog = require('../models/blog.model')
let model = new Blog();
exports.getlistBlog = (req, res) => {
    model.getBlog((err, data) => {
        res.send( data )
    })
}