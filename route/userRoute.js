const express = require('express')
const router = express.Router()
const userController = require("../controller/userController")
// middleware that is specific to this router
router.use((req, res, next) => {
   console.log("API Called ",new Date());
    next()
})
router.post("/addUser",function(req,res){
   userController.addNewUser(req,res);
})
router.get("/getUsers",function(req,res){
    userController.getAllUser(req,res);
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
module.exports = router;