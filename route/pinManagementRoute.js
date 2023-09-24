const express = require('express')
const router = express.Router()
const pinController = require("../controller/pinController")
const commonFunction = require("../utils/commonFunction");
router.use((req, res, next) => {

   console.log("Pin API Called ",new Date());
   console.log("API Called ",new Date());
   
   //token autheticate
  let authenticURL = ['/addNewPin','/updatePin'];
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
router.post("/addNewPin",function(req,res){

    pinController.addNewPin(req,res);
})
router.post("/updatePin",function(req,res){
    pinController.updatePin(req,res);
 })
router.post("/validatePinForUser",function(req,res){
    pinController.validatePinForUser(req,res);
})

module.exports = router;