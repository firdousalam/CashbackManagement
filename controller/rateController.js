const rateModel = require("../model/rateSchema");
const CONSTANT = require("../utils/constant") 
const commonFunction = require("../utils/commonFunction");
let httpResponse = CONSTANT.HttpResponse;
const userController = {
    "addNewRate" : async function(req,res){
        // we will call one function and do validation from there
        const validation = commonFunction.walletRateValidation(req.body)
        if(validation.status == true){// is validation successfull
            let insertData = {
                                "name" : req.body.name,
                                "rate" : req.body.rate,
                                "point" : req.body.point,
                                "currency" : req.body.currency,
                                "region" : req.body.region,
                                "rateType" : req.body.rateType
                            };

            console.log((req.body));
            let condition = "";
            condition =  {'name': parseInt(req.body.name)};

            rateModel.find(condition).then((rateList)=>{
                console.log(rateList);
                if(rateList.length==0){
                    const rate = new rateModel(insertData);
                    //  it will be save on any page or database and we can see only this logs using splunk or any other tools
                    try {
                        rate.save(); // save data inside users table 
                        httpResponse.message = CONSTANT.validation.success;
                        httpResponse.data = rate;
                        res.status(200).send(httpResponse);
                        //sending user json as response to client
                    } catch (err) {
                   
                        httpResponse.message = CONSTANT.validation.error;
                        httpResponse.data = err;
                        res.status(500).send(httpResponse);
                    }
                }else{
                    httpResponse.message = CONSTANT.validation.rateNameAlreadyExists;
                    httpResponse.data = "";
                    res.status(403).send(httpResponse);
                 }
            })
        }else{
            
            httpResponse.message = validation.message;
            httpResponse.data = validation;
            res.status(validation.statusCode).send(httpResponse);
        }

    },
    "getAllRate" : function(req,res){
        let { page, size, sort } = req.query;
        const { limit, offset } = commonFunction.getPagination(page, size);//{ offset, limit }
        rateModel.find({})
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
    "getParticularRate" : function(req,res){
        rateModel.find({"_id":req.params.rateId}).then((list)=>{
            httpResponse.message = CONSTANT.validation.success;
            httpResponse.data = list;
            res.status(200).send(httpResponse);
    
        }).catch((err)=>{
            httpResponse.message = CONSTANT.validation.error;
            httpResponse.data = err;
            res.status(500).send(httpResponse);
        })
    },
    "getRateByRegion" : function(req,res){
        rateModel.find({"region":req.params.regionId}).then((list)=>{
            httpResponse.message = CONSTANT.validation.success;
            httpResponse.data = list;
            res.status(200).send(httpResponse);
    
        }).catch((err)=>{
            httpResponse.message = CONSTANT.validation.error;
            httpResponse.data = err;
            res.status(500).send(httpResponse);
        })
    },
    "updateRate" : function(req,res){
        let updateData = {
            "name" : req.body.name,
            "rate" : req.body.rate,
            "region" : req.body.region,
            "rateType" : req.body.rateType,
            "status" : req.body.status,
            "dateTime" : new Date()
        };
        rateModel.find({"status" : CONSTANT.applicationConstant.activeStatus,
               'name': parseInt(req.body.name),
                '_id': {$ne :  req.params.rateId}}).then((list)=>{
                if(list.length>0){
                    httpResponse.message = CONSTANT.validation.rateNameAlreadyExists;
                    httpResponse.data = "";
                    res.status(403).send(httpResponse);
                   
                }else{
                    rateModel.findOneAndUpdate({"_id":req.params.rateId},updateData)
                    .then((adminType)=>{
                        httpResponse.message = CONSTANT.validation.success;
                        httpResponse.data = updateData;
                        res.status(200).send(httpResponse);
                    })
                }
              }).catch((err)=>{
                httpResponse.message = CONSTANT.validation.error;
                httpResponse.data = err;
                res.status(500).send(httpResponse);
              })
    }
}
module.exports = userController;