
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
    let OrderController=require('../controllers/order.controller')
    app.get("/getOrder",OrderController.getlist)
    app.post("/postOrder",OrderController.Post)
    app.post("/postDetailOrder",OrderController.DetailOrder)
    app.get("/GetDetailOrder",OrderController.AdminDetailOrder)
    app.put("/updateStt",OrderController.PutAcceptOrder)
    app.get("/thongke",OrderController.AdminTotalOrder)
    app.get("/totalMoney",OrderController.AdminTotalMoney)


    //Thừa
    app.delete("/DeleteP",OrderController.Delete)
    app.get("/FindProduct",OrderController.Find)
    app.get("/getProductByCategory",OrderController.GetCategory)
    app.get("/FindAll",OrderController.FindA)
   

    // app.post("/Product",ProductController.)
}