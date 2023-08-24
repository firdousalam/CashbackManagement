const express = require('express')
const router = express.Router()
const rewardController = require("../controller/rewardController")
// middleware that is specific to this router
router.use((req, res, next) => {
   console.log("Rewards API Called ",new Date());
    next()
})
router.post("/addreward",function(req,res){
  rewardController.addNewReward(req,res);
})
router.get("/getAllReward",function(req,res){
  rewardController.getAllReward(req,res);
 })
 router.get("/getReward/:rewardId",function(req,res){
  rewardController.getParticularReward(req,res);
 })
 router.put("/updatereward/:rewardId",function(req,res){
  rewardController.updateReward(req,res);
 })
module.exports = router;