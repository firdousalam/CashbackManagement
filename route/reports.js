const express = require('express')
const router = express.Router()
const reportController = require("../controller/reportController")
// middleware that is specific to this router
router.use((req, res, next) => {
   console.log("API Called ",new Date());
    next()
})

router.get("/totalCashBackEarnToday",function(req,res){
    reportController.totalCashBackEarnToday(req,res);
 })
 router.get("/totalCashBackRedeemToday",function(req,res){
   reportController.totalCashBackRedeemToday(req,res);
 })
router.get("/totalCashBackEarned",function(req,res){
   reportController.totalCashBackEarned(req,res);
})
router.get("/totalCashBackRedeem",function(req,res){
  reportController.totalCashBackRedeem(req,res);
})
router.get("/totalCashBackEarnByRegionAndDate",function(req,res){
  reportController.totalCashBackEarnByRegionAndDate(req,res);
})
router.get("/totalCashBackRedeemByRegionAndDate",function(req,res){
 reportController.totalCashBackRedeemByRegionAndDate(req,res);
})
router.get("/CashBackEarnByRegionAndDate",function(req,res){
  reportController.CashBackEarnByRegionAndDate(req,res);
})
router.get("/CashBackRedeemByRegionAndDate",function(req,res){
 reportController.CashBackRedeemByRegionAndDate(req,res);
})


module.exports = router;