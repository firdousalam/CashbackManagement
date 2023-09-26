const express = require('express')
const router = express.Router()
const userController = require("../controller/userController")
const commonFunction = require("../utils/commonFunction");
router.use((req, res, next) => {

   console.log("Pin API Called ",new Date());
   console.log("API Called ",new Date());
   
   //token autheticate
  let authenticURL = ['/getLoginUserDetails'];
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

router.post("/addUser",function(req,res){
   userController.addNewUser(req,res);
})
router.get("/getUsers",function(req,res){
    userController.getAllUser(req,res);
 })
 router.post("/getLoginUserDetails",function(req,res){
   userController.getLoginUserDetails(req,res);
})
 router.get("/getUserByRegion/:region",function(req,res){
   userController.getUserByRegion(req,res);
})
 router.get("/getUser/:userId",function(req,res){
   userController.getParticularUser(req,res);
 })
 router.post("/updateUser/:userId",function(req,res){
    userController.updateUser(req,res);
 })
 router.post("/updateUserEmailAndUserName/:userId",function(req,res){
   userController.updateUserEmailAndUserName(req,res);
})
module.exports = router;