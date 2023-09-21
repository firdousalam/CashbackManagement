const Mongoose  = require("../config/mongoDBConfig")
const userModel = require("../model/userSchema");
const CONSTANT = require("../utils/constant") 
const commonFunction = require("../utils/commonFunction");
let httpResponse = CONSTANT.HttpResponse;
const SMS = require("../utils/SMS")
const userController = {
    "addNewUser" : async function(req,res){
        // we will call one function and do validation from there
        let updateData = {
            "otp" : commonFunction.generateRandonPID(),
            "otpDateTime" : new Date(),
            "otpType"  : "Login"
        };
        let RegisterUsing = "";
        try{
            const validation = commonFunction.userValidation(req.body)
            console.log(validation);
            if(validation.status == true){// is validation successfull
                let insertData = {
                                    "firstName" : req.body.firstName,
                                    "lastName" : req.body.lastName,
                                    "password" : req.body.password,
                                    "address" : req.body.address,
                                    "emailId" : req.body.emailId,
                                    "mobileNo" : parseInt(req.body.mobileNo),
                                    "region"  : req.body.region
                                };
                const user = new userModel(insertData);
                let condition = "";
                if(typeof req.body.emailId != 'undefined' && req.body.emailId != ''){
                    condition = { $or:[ {'emailId':req.body.emailId}, {'mobileNo': parseInt(req.body.mobileNo)} ]}
                }
                else
                {
                    RegisterUsing = "mobile";
                    condition =  {'mobileNo': parseInt(req.body.mobileNo)};
                    insertData["otp"] =  commonFunction.generateRandonPID();
                    insertData["otpDateTime"] =  new Date();
                    insertData["otpType"] =  "Login";
                }
                userModel.find(condition).then((userList)=>{
                    if(userList.length==0){
                        const user = new userModel(insertData);
                        //  it will be save on any page or database and we can see only this logs using splunk or any other tools
                        try {
                            
                            user.save().then((userData)=>{// save data inside users table 
                            
                                if(RegisterUsing == 'mobile'){
                                    userModel.find( {'mobileNo': parseInt(req.body.mobileNo)})
                                    .populate('region')
                                    .then((InsertedData)=>{
                                        
                                        let mobileNo = InsertedData[0].region.countryCode + InsertedData[0].mobileNo
                                        SMS.sendOTP(mobileNo,updateData.otp)
                                        httpResponse.message = CONSTANT.validation.OTPGenerateSuccessfully;
                                        httpResponse.data = updateData.otp;
                                    
                                        res.status(200).send(httpResponse);
                                    });
                                }
                                else{
                                    httpResponse.message = CONSTANT.validation.success;
                                    httpResponse.data = userData;
                                    res.status(200).send(httpResponse);
                                }
                                //sending user json as response to client
                            });
                        } catch (err) {
                    
                            httpResponse.message = CONSTANT.validation.error;
                            httpResponse.data = err;
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
                httpResponse.data = validation;
                res.status(validation.statusCode).send(httpResponse);
            }
        }
        catch (error){
            httpResponse.message = error;
            httpResponse.data = error;
            res.status(500).send(httpResponse);
        }

    },
    "getAllUser" : function(req,res){

        try{
            console.log("getting all user");
            let { page, size, sort } = req.query;
            const { limit, offset } = commonFunction.getPagination(page, size);//{ offset, limit }
            console.log("offset",offset);
            console.log("limit",limit)
            userModel.find({ mobileNo: { $ne: null } }).skip(offset).limit(limit).then((list)=>{
                httpResponse.message = CONSTANT.validation.success;
                httpResponse.data = list;
                res.status(200).send(httpResponse);
        
            }).catch((err)=>{
                httpResponse.message = CONSTANT.validation.error;
                httpResponse.data = err;
                res.status(500).send(httpResponse);
            })
        }
        catch (error){
            httpResponse.message = error;
            httpResponse.data = error;
            res.status(500).send(httpResponse);
        }
    },
    "getParticularUser" : function(req,res){
        
        userModel.find({"_id":req.params.userId}).populate("region").then((list)=>{
            httpResponse.message = CONSTANT.validation.success;
            httpResponse.data = list;
            res.status(200).send(httpResponse);
    
        }).catch((err)=>{
            httpResponse.message = CONSTANT.validation.error;
            httpResponse.data = err;
            res.status(500).send(httpResponse);
        })
    },
    "updateUser" : function(req,res){
        let updateData = {
            "firstName" : req.body.firstName,
            "lastName" : req.body.lastName,
            "address" : req.body.address,
            "emailId" : req.body.emailId,
            "mobileNo" : parseInt(req.body.mobileNo),
            "region"  : req.body.region
        };
        userModel.find({"status" : CONSTANT.applicationConstant.activeStatus,
                $or:[ {'emailId':req.body.emailId}, {'mobileNo': parseInt(req.body.mobileNo)} ],
                '_id': {$ne :  req.params.userId}}).then((list)=>{
                if(list.length>0){
                    httpResponse.message = CONSTANT.validation.adminWithMobileNoOrEmailExist;
                    httpResponse.data = "";
                    res.status(403).send(httpResponse);
                   
                }else{
                    userModel.findOneAndUpdate({"_id":req.params.userId},updateData)
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
    },
    "getUserByRegion" : function(req,res){
        const validation = commonFunction.regionIdValidation(req.params)
        if(validation.status == true){// is validation successfull
            console.log("getting  user by regions");
            let { page, size, sort } = req.query;
            const { limit, offset } = commonFunction.getPagination(page, size);//{ offset, limit }
            userModel.find({ "region"  : req.params.region})
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
            
            httpResponse.message = CONSTANT.validation.blankRegion;
            httpResponse.data = validation;
            res.status(validation.statusCode).send(httpResponse);
        }
    },
}
module.exports = userController;