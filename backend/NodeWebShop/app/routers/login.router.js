
module.exports=(app)=>{
    let LoginController=require('../controllers/login.controller')
   
    app.get("/login",LoginController.getUC)
    app.post("/register",LoginController.Post)
    app.delete("/deleteUser", LoginController.Delete)

    // app.post("/Product",ProductController.)
}