const Mongoose  = require("../config/mongoDBConfig")
const adminModel = require("../model/adminSchema");
const CONSTANT  = require("../utils/constant");
const commonFunction = require("../utils/commonFunction");
let httpResponse = CONSTANT.HttpResponse;
let deepPopulateAdmin = {
    path : 'adminType',
    populate : {
      path : 'region'
    }
  };
const userController = {
    "addAdmin" : function(req,res){

        // we will call one function and do validation from there
        const validation = commonFunction.adminValidation(req.body)
       
        if(validation.status == true){// is validation successfull
            
            let insertData = {
                                "firstName" : req.body.firstName,
                                "lastName" : req.body.lastName,
                                "password" : req.body.password,
                                "address" : req.body.address,
                                "emailId" : req.body.emailId,
                                "mobileNo" : parseInt(req.body.mobileNo),
                                "adminType" : req.body.adminType
                            };

            console.log((req.body));
            adminModel.find( { $or:[ {'emailId':req.body.emailId}, {'mobileNo': parseInt(req.body.mobileNo)} ]}).then((adminList)=>{
                if(adminList.length==0){
                    const admin = new adminModel(insertData);
                    
                    try {
                        admin.save(); // save data inside users table 
                        httpResponse.message = CONSTANT.validation.userCreateSuccessfully;
                        httpResponse.data = admin;
                        res.send(httpResponse); //sending user json as response to client
                   
                    } catch (error) {
                    
                        httpResponse.message = CONSTANT.validation.error;
                        httpResponse.data = error;
                        res.status(500).send(httpResponse);
                    }
                }else{
                   
                    httpResponse.message = CONSTANT.validation.adminWithMobileNoOrEmailExist;
                    httpResponse.data = "";
                    res.status(403).send(httpResponse);
                 }
            })
        }else{
           
           httpResponse.message = validation.message;
           httpResponse.data = "";
           res.status(validation.statusCode).send(httpResponse);
        }
    },
    "getAdmins" : function(req,res){

        let { page, size, sort } = req.query;
        const { limit, offset } = commonFunction.getPagination(page, size);
        adminModel.find({"status" : CONSTANT.applicationConstant.activeStatus})
            .populate(deepPopulateAdmin)
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
    "getParticularAdmin" : function(req,res){
        adminModel.find({"_id":req.params.adminId})
        .populate(deepPopulateAdmin)
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
    "updateAdmin" : function(req,res){
       // we will call one function and do validation from there
       const validation = commonFunction.adminValidationUpdate(req.body)
       
       if(validation.status == true){// is validation successfull
           
            let updateData = {
                "firstName" : req.body.firstName,
                "lastName" : req.body.lastName,
                "address" : req.body.address,
                "emailId" : req.body.emailId,
                "mobileNo" : parseInt(req.body.mobileNo),
                "adminType" : req.body.adminType
            };
            adminModel.find({"status" : CONSTANT.applicationConstant.activeStatus,
                $or:[ {'emailId':req.body.emailId}, {'mobileNo': parseInt(req.body.mobileNo)} ],
                '_id': {$ne :  req.params.adminId}}).then((list)=>{
                if(list.length>0){
                    httpResponse.message = CONSTANT.validation.adminWithMobileNoOrEmailExist;
                    httpResponse.data = "";
                    res.status(403).send(httpResponse);
                }else{
                    adminModel.findOneAndUpdate({"_id":req.params.adminId},updateData)
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
        }else{
           
            httpResponse.message = validation.message;
            httpResponse.data = "";
            res.status(validation.statusCode).send(httpResponse);
         }
    }
}
module.exports = userController;