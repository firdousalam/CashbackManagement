const walletModel = require("../model/walletSchema");
const CONSTANT = require("../utils/constant") 
const commonFunction = require("../utils/commonFunction");
let httpResponse = CONSTANT.HttpResponse;
function checkAdult(details,condition) {
    return details._id.user == condition;
  }
const walletController = {
    "addNewWallet" : async function(req,res){

        // we will call one function and do validation from there
        const validation = commonFunction.walletValidation(req.body)
        if(validation.status == true){// is validation successfull
            let insertData = {
                                "user"                  : req.body.user,
                                "insertedBy"            : req.body.insertedBy,
                                
                                "reward"                : req.body.reward,
                                "description"           : req.body.description,
                                "walletType"            : req.body.walletType,
                                "startDate"             : req.body.startDate,
                                "endDate"               : req.body.endDate,
                                "amount"                : req.body.amount
                            };
            if(typeof req.body.adminId != 'undefined' && req.body.adminId != ''){
                insertData.adminId = req.body.adminId;

            }
            console.log((req.body));
            let condition = "";
            condition =  {'reward': req.body.reward,"user":req.body.user};

            walletModel.find(condition).then((List)=>{
                console.log(List);
                if(List.length==0){
                    const rate = new walletModel(insertData);
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
                    httpResponse.message = CONSTANT.validation.userRewardAlreadyExist;
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
    "getAllWallet" : function(req,res){
        console.log("getting all rewards");
        let { page, size, sort } = req.query;
        const { limit, offset } = commonFunction.getPagination(page, size);//{ offset, limit }
        walletModel.find({ "walletType" : CONSTANT.applicationConstant.walletType})
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
    "getUserWallet" : function(req,res){
        console.log("getting all wallet for user",req.params);
        const validation = commonFunction.userIdValidation(req.params)
        if(validation.status == true){// is validation successfull
            let { page, size, sort } = req.query;
            const { limit, offset } = commonFunction.getPagination(page, size);//{ offset, limit }
            walletModel.find({"user" : req.params.userId,"walletType" : CONSTANT.applicationConstant.walletType})
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
    "getParticularWalletDetails" : function(req,res){
        
        walletModel.find({"_id":req.params.walletId,"walletType" : CONSTANT.applicationConstant.walletType},)
        .populate("reward")
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
    "updateWallet" : function(req,res){
        let updateData = {
            "user"                  : req.body.user,
            "insertedBy"            : req.body.insertedBy,
            "adminId"               : req.body.adminId,
            "reward"                : req.body.reward,
            "description"           : req.body.description,
            "walletType"            : req.body.walletType,
            "startDate"             : req.body.startDate,
            "endDate"               : req.body.endDate,
            "amount"                : req.body.amount,
            "status"                : req.body.status,
            "dateTime"              : new Date()
        };
        walletModel.find({"status" : CONSTANT.applicationConstant.activeStatus,
               'reward': parseInt(req.body.reward),
                '_id': {$ne :  req.params.walletId}}).then((list)=>{
                if(list.length>0){
                    httpResponse.message = CONSTANT.validation.rewardNameAlreadyExists;
                    httpResponse.data = "";
                    res.status(403).send(httpResponse);
                   
                }else{
                    walletModel.findOneAndUpdate({"_id":req.params.walletId},updateData)
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
        "addRedeem" : async function(req,res){
            // we will call one function and do validation from there
            const validation = commonFunction.redeemValidation(req.body)
            if(validation.status == true){// is validation successfull
                let insertData = {
                                    "user"                  : req.body.user,
                                    "insertedBy"            : req.body.insertedBy,
                                    "adminId"               : req.body.adminId,
                                    "description"           : req.body.description,
                                    "walletType"            : CONSTANT.applicationConstant.redeemType,
                                    "amount"                : 0,
                                    "redeemId"              : req.body.redeemId
                                };
    
                if(typeof req.body.adminId != 'undefined' && req.body.adminId != ''){
                    insertData.adminId = req.body.adminId;
    
                }
                let condition = "";
                condition =  {'user': req.body.user};
                walletModel.find({
                    "walletType"            : CONSTANT.applicationConstant.redeemType,
                    "user"                  : req.body.user,
                    "redeemId"              : req.body.redeemId
                }).then((List)=>{
                    if(List.length ==0){
                        walletModel.find({
                                "walletType"       : CONSTANT.applicationConstant.walletType,
                                "_id"              : req.body.redeemId
                            }).then((WalletDetails)=>{
                                insertData.amount = WalletDetails[0].amount
                                console.log(insertData);
                                const rate = new walletModel(insertData);
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
                           

                        });
                    }else{
                        httpResponse.message = CONSTANT.validation.cashbackAlreadyUsed;
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
        "getAllWalletRedeem" : function(req,res){
            console.log("getting all getAllWalletRedeem");
            let { page, size, sort } = req.query;
            const { limit, offset } = commonFunction.getPagination(page, size);//{ offset, limit }
            walletModel.find({"walletType" : CONSTANT.applicationConstant.redeemType})
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
        "getUserWalletRedeem" : function(req,res){
            const validation = commonFunction.userIdValidation(req.params)
            if(validation.status == true){
                let { page, size, sort } = req.query;
                const { limit, offset } = commonFunction.getPagination(page, size);//{ offset, limit }
                walletModel.find({"user" : req.params.userId,"walletType" : CONSTANT.applicationConstant.redeemType})
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
        "getUserWalletBalance" : function(req,res){
            const validation = commonFunction.userIdValidation(req.params)
            if(validation.status == true){
                walletModel.aggregate([
                    {
                        $group: {
                        _id: {"user" : "$user","walletType" : "$walletType"},
                        "total" : {
                            $sum : "$amount"
                            }
                        }
                    }
                ] 
            ).then((List)=>{
                commonFunction.getWalletAndRedeemDetails(List,req.params.userId,function(data){
                    let wallet = data.walletAmount;
                    let redeem = data.radeemAmount;
                    let balance = wallet-redeem;
                    console.log("bbbbbbb",data);
                    httpResponse.message = CONSTANT.validation.success;
                    httpResponse.data = {
                        "totalWallet" : wallet,
                        "totalRadeem" : redeem,
                        "balance"     : balance
                    };
                    res.status(200).send(httpResponse);
                });
            
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
        "getAllWalletAddedToday" : function(req,res){
            console.log("getting all rewards");
            let { page, size, sort } = req.query;
            const { limit, offset } = commonFunction.getPagination(page, size);//{ offset, limit }
            walletModel.find({})
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
        "getAllWalletRedeemToday" : function(req,res){
            console.log("getting all rewards");
            let { page, size, sort } = req.query;
            const { limit, offset } = commonFunction.getPagination(page, size);//{ offset, limit }
            walletModel.find({})
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
        "getAlletWalletDetailsOfUser" : function(req,res){
            console.log("getting all wallet for user",req.params);
            const validation = commonFunction.userIdValidation(req.params)
            if(validation.status == true){// is validation successfull
                let { page, size, sort } = req.query;
                const { limit, offset } = commonFunction.getPagination(page, size);//{ offset, limit }
                walletModel.find({"user" : req.params.userId})
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
        }
}
module.exports = walletController;