const adminTypeModel = require("../model/adminTypeSchema");
const validation = require("../validation/userValidation")
const CONSTANT  = require("../utils/constant");
const commonFunction = require("../utils/commonFunction");
let httpResponse = CONSTANT.HttpResponse;
const userController = {
    "addAdminType" : function(req,res){
        console.log("test1")
        if(validation.blankCheck(req.body.adminType) && validation.blankCheck(req.body.region)){
            let insertData = {
                "adminType" : req.body.adminType,
                "region"    : req.body.region
            };
            console.log("insertData",insertData);
            adminTypeModel.find({"adminType" : req.body.adminType,"status" : CONSTANT.applicationConstant.activeStatus}).then((adminTypeList)=>{
                if(adminTypeList.length==0){
                    const adminType = new adminTypeModel(insertData);
                    try {
                        adminType.save(); 
                        httpResponse.message = CONSTANT.validation.success;
                        httpResponse.data = adminType;
                        res.send(httpResponse);
                       
                    } catch (error) {
                        httpResponse.message = CONSTANT.validation.error;
                        httpResponse.data = error;
                        res.status(500).send(httpResponse);
                    }
                }
                else{
                    httpResponse.message = CONSTANT.validation.adminTypeAlreadyExist;
                    httpResponse.data = "";
                    res.status(403).send(httpResponse);
                }
            });
        }else{
            httpResponse.message = CONSTANT.validation.adminTypeAlreadyExist;
            httpResponse.data = "";
            res.status(403).send(httpResponse);
        }
    },
    "getAdminType" : function(req,res){
        console.log("getting all user");
        let { page, size, sort } = req.query;
        const { limit, offset } = commonFunction.getPagination(page, size);
      
        adminTypeModel.find({"status" : CONSTANT.applicationConstant.activeStatus})
            .populate('region')
            .skip(offset)
            .limit(limit)
            .then((list)=>{
            httpResponse.message = CONSTANT.validation.success;
            httpResponse.data = list;
            res.send(httpResponse);
          }).catch((error)=>{
            httpResponse.message = CONSTANT.validation.error;
            httpResponse.data = error;
            res.status(500).send(httpResponse);
          })
    },
    "getParticularAdminType" : function(req,res){
        if(typeof req.params.adminTypeId == 'undefined' || req.params.adminTypeId == '')
        {
            httpResponse.message = CONSTANT.validation.blankAdminTypeID;
            httpResponse.data = "";
            res.status(403).send(httpResponse);
        }
        else{
            adminTypeModel.find({"_id":req.params.adminTypeId,"status" : CONSTANT.applicationConstant.activeStatus})
            .populate('region').then((list)=>{
                httpResponse.message = CONSTANT.validation.success;
                httpResponse.data = list;
                res.send(httpResponse);
            }).catch((error)=>{
                httpResponse.message = CONSTANT.validation.error;
                httpResponse.data = error;
                res.status(500).send(httpResponse);
            })
        }
    },
    "updateAdminType" : function(req,res){
      
       if(typeof req.params.adminTypeId == 'undefined' || req.params.adminTypeId == '')
        {
            httpResponse.message = CONSTANT.validation.blankAdminTypeID;
            httpResponse.data = "";
            res.status(403).send(httpResponse);
        }
        else{
            let updateData = {
                "adminType" : req.body.adminType,
                "region"    : req.body.region,
                "status"    : req.body.status
            };
            adminTypeModel.find({"status" : CONSTANT.applicationConstant.activeStatus,
                                "adminType":req.body.adminType,
                                '_id': {$ne :  req.params.adminTypeId}}).then((list)=>{
                if(list.length>0){
                    httpResponse.message = CONSTANT.validation.adminTypeAlreadyExist;
                    httpResponse.data = "";
                    res.status(403).send(httpResponse);
                }else{
                    adminTypeModel.findOneAndUpdate({"_id":req.params.adminTypeId},updateData)
                    .then((adminType)=>{
                        httpResponse.message = CONSTANT.validation.success;
                        httpResponse.data = updateData;
                        res.send(httpResponse);
                    })
                }
              }).catch((error)=>{
                httpResponse.message = CONSTANT.validation.error;
                httpResponse.data = error;
                res.status(500).send(httpResponse);
              })
        }
        
    }
}
module.exports = userController;