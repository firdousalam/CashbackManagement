const express = require('express')
const router = express.Router()
const walletRateController = require("../controller/rateController")
// middleware that is specific to this router
router.use((req, res, next) => {
   console.log("Wallet API Called ",new Date());
    next()
})
router.post("/addRate",function(req,res){
   walletRateController.addNewRate(req,res);
})
router.get("/getAllRate",function(req,res){
   walletRateController.getAllRate(req,res);
 })
 router.get("/getRate/:rateId",function(req,res){
   walletRateController.getParticularRate(req,res);
 })
 router.get("/getRateByRegion/:regionId",function(req,res){
  walletRateController.getRateByRegion(req,res);
})
 router.put("/updateRate/:rateId",function(req,res){
   walletRateController.updateRate(req,res);
 })
module.exports = router;