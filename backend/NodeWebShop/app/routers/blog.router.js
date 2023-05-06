module.exports=(app)=>{
    let controllerBlog=require('../controllers/blog.controller')
    app.get("/getBlog",controllerBlog.getlistBlog)


}