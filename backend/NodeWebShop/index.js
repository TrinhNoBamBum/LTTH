var express = require('express');
var cors = require('cors')
var app = express();
var bodyParser = require('body-parser')
const multer = require('multer');
const { pool,mssql } = require('./connect')

app.use(bodyParser.json())

app.use(cors())
//Cloudinary 

// Đường dẫn đến ảnh trên máy tính của bạn
const imagePath = 'path/to/image.jpg';

// Tải ảnh lên Cloudinary


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });
  const upload = multer({ storage: storage });
  app.post('/upload', upload.single('image'), function(req, res) {
    res.send('File uploaded!');
  });
//api order
require('./app/routers/order.router')(app)
//api Product
require('./app/routers/product.router')(app)

//api Blog
require('./app/routers/blog.router')(app)
//api cart
require('./app/routers/cart.router')(app)
//api slide 
require('./app/routers/slide.router')(app)

require('./app/routers/login.router')(app)

//api slide
app.delete('/Product', async (req,res)=>{
    var id=req.query.Id;
    var sql="DELETE FROM PRODUCT WHERE Id=@id";
    return await pool.request()
    .input('id',mssql.Int,req.query.Id)
    .query(sql,(err,data)=>{
        res.send("Xóa sản phẩm thành công")
    })
})
app.listen(8888, () => {
    console.log("ứng dụng vẫn đang chạy ngon lành")
})