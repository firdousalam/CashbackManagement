const express = require('express')
const router = express.Router()
const savingController = require("../controller/savingController")
// middleware that is specific to this router
router.use((req, res, next) => {
   console.log("savingController API Called ",new Date());
    next()
})
router.post("/addSaving",function(req,res){
    savingController.addSaving(req,res);
})
router.get("/getAllSaving",function(req,res){
    savingController.getAllSaving(req,res);
 })
 router.get("/getParticularSaving/:savingId",function(req,res){
    savingController.getParticularSaving(req,res);
 })
 router.get("/getUserSaving/:userId",function(req,res){
    savingController.getUserSaving(req,res);
 })

 router.post("/updateSaving/:savingId",function(req,res){
    savingController.updateSaving(req,res);
 })

module.exports = router;