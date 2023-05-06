
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'C:/Users/t490/OneDrive/Desktop/webShopThoiTrang/WebShopFashion/public/assets/img/product/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname )
    }
  });
  const upload = multer({ storage: storage });
//   app.post('/upload', upload.single('image'), function(req, res) {
//     res.send('File uploaded!');
//   });
module.exports=(app)=>{
    let ProductController=require('../controllers/product.controller')
    app.get("/getProduct",ProductController.getlist)
    app.post("/Product",upload.single('file'),ProductController.Post)
    app.put("/ProductSP",ProductController.Put)
    app.delete("/DeleteP",ProductController.Delete)
    app.get("/FindProduct",ProductController.Find)
    app.get("/getProductByCategory",ProductController.GetCategory)
    app.get("/FindAll",ProductController.FindA)
    app.get("/getPagination",ProductController.GetPaginationProduct)
    app.post("/postComment",ProductController.controllerComment)
    app.get("/getComment",ProductController.getControllerComment)
    app.get("/getCategory",ProductController.getControllerCategory)
    

    // app.post("/Product",ProductController.)
}