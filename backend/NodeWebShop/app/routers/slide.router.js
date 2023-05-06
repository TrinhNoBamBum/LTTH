
module.exports=(app)=>{
    let SlideController=require('../controllers/slide.controller')
    app.get("/GetSlide",SlideController.Get)
 
}