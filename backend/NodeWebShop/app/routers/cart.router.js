
module.exports=(app)=>{
    let CartController=require('../controllers/cart.controller')

    app.post("/postCart",CartController.Post)
    app.get("/GetCart",CartController.Get)
    app.delete("/Cart",CartController.Delete)
    app.delete("/delete",CartController.DeleteAll)
 
}