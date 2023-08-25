
const regionModel = require("../model/regionSchema");
const validation = require("../validation/userValidation")
const CONSTANT  = require("../utils/constant");
const commonFunction = require("../utils/commonFunction");
let httpResponse = CONSTANT.HttpResponse;
const regionController = {
    "addNewRegion" :  function(req,res){
        if(validation.blankCheck(req.body.region) 
            && validation.blankCheck(req.body.timeZone)
            && validation.blankCheck(req.body.displayTimeZone)
            && validation.blankCheck(req.body.countryCode)
        ){
            let insertData = {
                "region" : req.body.region,
                "timeZone" : req.body.timeZone,
                "displayTimeZone" : req.body.displayTimeZone,
                "countryCode" : req.body.countryCode,
                "status"    : CONSTANT.applicationConstant.activeStatus
            };
            regionModel.find({"region" : req.body.region,"status" : CONSTANT.applicationConstant.activeStatus})
            .then((list)=>{
                console.log("region",list);
                if(list.length==0){
                    const region = new regionModel(insertData);
                    try {
                        region.save();
                        httpResponse.message = CONSTANT.validation.success;
                        httpResponse.data = region;
                        res.status(200).send(httpResponse);
                    } catch (error) {
                        httpResponse.message = CONSTANT.validation.error;
                        httpResponse.data = error;
                        res.status(500).send(httpResponse);
                    }
                }else{
                   
                    httpResponse.message = CONSTANT.validation.regionAlreadyExist;
                    httpResponse.data = "";
                    res.status(403).send(httpResponse);
                }
            });
        }else{
          
            httpResponse.message = CONSTANT.validation.blankCommonMessage;
            httpResponse.data = "";
            res.status(403).send(httpResponse);
        }
    },
    "getRegion" : function(req,res){
        console.log("getting all Region");
        let { page, size, sort } = req.query;
        const { limit, offset } = commonFunction.getPagination(page, size);//{ offset, limit }
        regionModel.find({})
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
    "getParticularRegion" : function(req,res){
        console.log("getting all Region");
        regionModel.find({"_id":req.params.regionId}).then((list)=>{
            httpResponse.message = CONSTANT.validation.success;
            httpResponse.data = list;
            res.status(200).send(httpResponse);
          }).catch((err)=>{
            httpResponse.message = CONSTANT.validation.error;
            httpResponse.data = err;
            res.status(500).send(httpResponse);
          })
    },
    "updateRegion": function(req,res){
        console.log("Update Region");
        if(validation.blankCheck(req.body.region) 
        && validation.blankCheck(req.body.timeZone)
        && validation.blankCheck(req.body.displayTimeZone)
        && validation.blankCheck(req.body.countryCode)
        ){
            let updateData = {
                "region" : req.body.region,
                "timeZone" : req.body.timeZone,
                "displayTimeZone" : req.body.displayTimeZone,
                "countryCode" : req.body.countryCode,
                "status"    : CONSTANT.applicationConstant.activeStatus
            };
            regionModel.find({"status" : CONSTANT.applicationConstant.activeStatus,
                            "region" : req.body.region,
                            '_id': {$ne : req.params.regionId}}).then((list)=>{
                if(list.length>0){
                    httpResponse.message = CONSTANT.validation.regionAlreadyExist;
                    httpResponse.data = "";
                    res.status(403).send(httpResponse);
                }else{
                    regionModel.findOneAndUpdate({"_id":req.params.regionId},updateData)
                    .then((region)=>{
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
        }else{
          
            httpResponse.message = CONSTANT.validation.blankCommonMessage;
            httpResponse.data = "";
            res.status(403).send(httpResponse);
        }
    }
}
module.exports = regionController;