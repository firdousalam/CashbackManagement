const express = require('express')
const router = express.Router()
const walletController = require("../controller/walletController")
// middleware that is specific to this router
router.use((req, res, next) => {
   console.log("Wallet API Called ",new Date());
    next()
})
router.post("/addNewWallet",function(req,res){
  walletController.addNewWallet(req,res);
})
router.get("/getAllWallet",function(req,res){
  walletController.getAllWallet(req,res);
})
router.get("/getUserWallet/:userId",function(req,res){
    walletController.getUserWallet(req,res);
  })

router.get("/getParticularWalletDetails/:walletId",function(req,res){
  walletController.getParticularWalletDetails(req,res);
})
router.put("/updateWallet/:walletId",function(req,res){
  walletController.updateWallet(req,res);
})
router.post("/addRedeem",function(req,res){
    walletController.addRedeem(req,res);
})
router.get("/getAllWalletRedeem",function(req,res){
    walletController.getAllWalletRedeem(req,res);
})
router.get("/getUserWalletRedeem/:userId",function(req,res){
    walletController.getUserWalletRedeem(req,res);
})
router.get("/getUserWalletBalance/:userId",function(req,res){
    walletController.getUserWalletBalance(req,res);
})
router.get("/getAllWalletAddedToday",function(req,res){
    walletController.getAllWalletAddedToday(req,res);
})
router.get("/getAllWalletRedeemToday",function(req,res){
    walletController.getAllWalletRedeemToday(req,res);
})
module.exports = router;