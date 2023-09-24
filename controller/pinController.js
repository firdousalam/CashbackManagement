const userModel = require("../model/userSchema");
const CONSTANT = require("../utils/constant") 
const commonFunction = require("../utils/commonFunction");
let httpResponse = CONSTANT.HttpResponse;
function checkAdult(details,condition) {
    return details._id.user == condition;
  }
const walletController = {
    "addNewPin" : async function(req,res){
    
        try{
            const validation = commonFunction.pinGenerationValidation(req.body)
            if(validation.status == true){
                condition = {_id : req.body.authData.id
                            };
                userModel.find(condition).then((userList)=>{
                    if(userList.length>0){
                        const updatedData = {
                            pin : req.body.pin
                        };
                       console.log({_id : req.body.authData.id
                       });
                        userModel.findOneAndUpdate({_id : req.body.authData.id
                        },updatedData).then((userData)=>{
                           console.log(userData);
                            httpResponse.message = CONSTANT.validation.success;
                            httpResponse.data = "";
                            res.status(200).send(httpResponse);
                        });
                    }else{
                        httpResponse.message = CONSTANT.validation.loginUserNotExist;
                        httpResponse.data = "";
                        res.status(403).send(httpResponse);
                    }

                });
            
            }
        }catch (error){
            httpResponse.message = error;
            httpResponse.data = error;
            res.status(500).send(httpResponse);
        }

    },
    "updatePin" : function(req,res){
        try{
            const validation = commonFunction.pinGenerationValidation(req.body)
            if(validation.status == true){
                condition = {_id : req.body.authData.id
                            };
                userModel.find(condition).then((userList)=>{
                    if(userList.length>0){
                        const updatedData = {
                            pin : req.body.pin
                        };
                       console.log({_id : req.body.authData.id
                       });
                        userModel.findOneAndUpdate({_id : req.body.authData.id
                        },updatedData).then((userData)=>{
                           console.log(userData);
                            httpResponse.message = CONSTANT.validation.success;
                            httpResponse.data = "";
                            res.status(200).send(httpResponse);
                        });
                    }else{
                        httpResponse.message = CONSTANT.validation.loginUserNotExist;
                        httpResponse.data = {id : req.body.authData.id
                        };
                        res.status(403).send(httpResponse);
                    }

                });
            
            }
        }catch (error){
            httpResponse.message = error;
            httpResponse.data = error;
            res.status(500).send(httpResponse);
        }
    },
    "validatePinForUser" : function(req,res){
        try{
            const validation = commonFunction.pinGenerationValidation(req.body)
            if(validation.status == true){
                condition = {mobileNo : req.body.mobileNo,pin : req.body.pin
                            };
                console.log(condition);
                
                userModel.find(condition).then((data)=>{
                    console.log(data)
                    if(data.length>0){
                        let payLoad = {
                            email : data[0].emailId,
                            firstName : data[0].firstName,
                            mobileNo : data[0].mobileNo,
                            id : data[0]._id
                        };
                        commonFunction.encryptJWT(payLoad,function(err, token) {
                           
                            if (err) {// any JWT Error or Not
                                httpResponse.message = CONSTANT.validation.error;
                                httpResponse.data = err;
                                res.status(500).send(httpResponse);
                            }else{
                                httpResponse.message = CONSTANT.validation.success;
                                httpResponse.data = token;
                                res.status(200).send(httpResponse);
                            }
                        });   
                       
                    }else{
                        httpResponse.message = CONSTANT.validation.loginUserNotExist;
                        httpResponse.data = "";
                        res.status(403).send(httpResponse);
                    }

                });
            
            }
        }catch (error){
            httpResponse.message = error;
            httpResponse.data = error;
            res.status(500).send(httpResponse);
        }
       
    }
}
module.exports = walletController;