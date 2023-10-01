const SavingModel = require("../model/savingSchema")
const CONSTANT = require("../utils/constant") 
const commonFunction = require("../utils/commonFunction");
var mongoose = require('mongoose');
let httpResponse = CONSTANT.HttpResponse;


/*

router.post("/addSaving",function(req,res){
    savingController.addSaving(req,res);
})
router.get("/getAllSaving",function(req,res){
    savingController.getAllSaving(req,res);
 })
 router.get("/getSaving/:savingId",function(req,res){
    savingController.getParticularSaving(req,res);
 })
 router.get("/getSaving/:userId",function(req,res){
    savingController.getUserSaving(req,res);
 })
 router.get("/getSaving/:userId",function(req,res){
    savingController.getUserTotalSaving(req,res);
 })
 router.put("/updateSaving/:SavingId",function(req,res){
    savingController.updateSaving(req,res);
 })
*/

const SavingController = {
    "addSaving" : async function(req,res){

        // we will call one function and do validation from there
        const validation = commonFunction.SavingValidation(req.body)
        if(validation.status == true){// is validation successfull
            let insertData = {
                                "user"                          : req.body.user,
                                "amount"                        : req.body.amount,
                                "durationInMonth"               : req.body.durationInMonth,
                                "rateOfInterest"                : req.body.rateOfInterest,
                                "maturityDate"                  : req.body.maturityDate,
                                "autoRenewSaveAmountInterest"   : req.body.autoRenewSaveAmountInterest,
                                "autoRenewSaveAmountOnly"       : req.body.autoRenewSaveAmountOnly,
                                "amountAddPlusInterest"         : req.body.amountAddPlusInterest
                            };
            const saving = new SavingModel(insertData);
            //  it will be save on any page or database and we can see only this logs using splunk or any other tools
           
            try {
                saving.save(); // save data inside users table 
                httpResponse.message = CONSTANT.validation.success;
                httpResponse.data = saving;
                res.status(200).send(httpResponse);
                //sending user json as response to client
            } catch (err) {
                console.log(err);
                httpResponse.message = CONSTANT.validation.error;
                httpResponse.data = err;
                res.status(500).send(httpResponse);
            }
        }else{
            
            httpResponse.message = validation.message;
            httpResponse.data = validation;
            res.status(validation.statusCode).send(httpResponse);
        }

    },
    "getAllSaving" : function(req,res){
        console.log("getting all savings");
        let { page, size, sort } = req.query;
        const { limit, offset } = commonFunction.getPagination(page, size);//{ offset, limit }
        SavingModel.find()
        .skip(offset)
        .limit(limit)
        .then((list)=>{
            httpResponse.message = CONSTANT.validation.success;
            httpResponse.data = list;
            res.status(200).send(httpResponse);
    
          }).catch((err)=>{
            httpResponse.message = CONSTANT.validation.error;
            httpResponse.data = err;
            res.status(500).send(httpResponse);
          })
    },
    "getUserSaving" : function(req,res){
        
        const validation = commonFunction.userIdValidation(req.params)
        if(validation.status == true){// is validation successfull
            let { page, size, sort } = req.query;
            const { limit, offset } = commonFunction.getPagination(page, size);//{ offset, limit }
            SavingModel.find({"user" : req.params.userId})
            .skip(offset)
            .limit(limit)
            .then((list)=>{
                httpResponse.message = CONSTANT.validation.success;
                httpResponse.data = list;
                res.status(200).send(httpResponse);
        
            }).catch((err)=>{
                httpResponse.message = CONSTANT.validation.error;
                httpResponse.data = err;
                res.status(500).send(httpResponse);
            })
        }else{
            
            httpResponse.message = validation.message;
            httpResponse.data = validation;
            res.status(validation.statusCode).send(httpResponse);
        }
    },
    "getParticularSaving" : function(req,res){
        SavingModel.find({"_id":req.params.savingId})
        .then((list)=>{
            httpResponse.message = CONSTANT.validation.success;
            httpResponse.data = list;
            res.status(200).send(httpResponse);
    
        }).catch((err)=>{
            httpResponse.message = CONSTANT.validation.error;
            httpResponse.data = err;
            res.status(500).send(httpResponse);
        })
    },
    "updateSaving" : function(req,res){

        const validation = commonFunction.SavingValidation(req.body)
        if(validation.status == true){// is validation successfull
            let updateData = {
                    "user"                          : req.body.user,
                    "amount"                        : req.body.amount,
                    "durationInMonth"               : req.body.durationInMonth,
                    "rateOfInterest"                : req.body.rateOfInterest,
                    "maturityDate"                  : req.body.maturityDate,
                    "autoRenewSaveAmountInterest"   : req.body.autoRenewSaveAmountInterest,
                    "autoRenewSaveAmountOnly"       : req.body.autoRenewSaveAmountOnly,
                    "amountAddPlusInterest"         : req.body.amountAddPlusInterest,
                    "sataus"                        : req.body.sataus,
                    "dateTime"                      : new Date()
                };
                SavingModel.findOneAndUpdate({"_id":req.params.savingId},updateData)
                .then((updateD)=>{
                    httpResponse.message = CONSTANT.validation.success;
                    httpResponse.data = "";
                    res.status(200).send(httpResponse);
                })
            }else{
            
                httpResponse.message = validation.message;
                httpResponse.data = validation;
                res.status(validation.statusCode).send(httpResponse);
            } 
        }
}
module.exports = SavingController;