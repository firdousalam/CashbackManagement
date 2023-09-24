const userModel = require("../model/userSchema");
const CONSTANT = require("../utils/constant") 
const commonFunction = require("../utils/commonFunction");
let httpResponse = CONSTANT.HttpResponse;
function checkAdult(details,condition) {
    return details._id.user == condition;
  }
const languageController = {
    "addLanguage" : async function(req,res){
        try{
                condition = {_id : req.body.authData.id
                            };
                userModel.find(condition).then((userList)=>{
                    if(userList.length>0){
                        const updatedData = {
                            language : req.body.language
                        };
                      
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
            
           
        }catch (error){
            httpResponse.message = error;
            httpResponse.data = error;
            res.status(500).send(httpResponse);
        }
    },
    "updateLanguage" : function(req,res){
        try{
           
                condition = {_id : req.body.authData.id
                            };
                userModel.find(condition).then((userList)=>{
                    if(userList.length>0){
                        const updatedData = {
                            language : req.body.language
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
            
           
        }catch (error){
            httpResponse.message = error;
            httpResponse.data = error;
            res.status(500).send(httpResponse);
        }
    }
}
module.exports = languageController;