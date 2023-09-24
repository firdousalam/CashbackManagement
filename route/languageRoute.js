const express = require('express')
const router = express.Router()
const languageController = require("../controller/languageController")
const commonFunction = require("../utils/commonFunction");
router.use((req, res, next) => {

   console.log("Language API Called ",new Date());
   
   //token autheticate
  let authenticURL = ['/addLanguage','/updateLanguage'];
  console.log(req.path);
   if(authenticURL.includes(req.path))
   {
     let token = req.headers.authorization;
     console.log(token);
     commonFunction.decryptJWT(token,function(error,data){
        if(error){
           res.status(403).send(CONSTANT.validation.loginUserNotExist);
        }else{
          console.log(data);
            req.body.authData = data;
            next();
          
        } 
     })
   }else
   {
     next()
   }
})
router.post("/addLanguage",function(req,res){

    languageController.addLanguage(req,res);
})
router.post("/updateLanguage",function(req,res){
    languageController.updateLanguage(req,res);
 })


module.exports = router;