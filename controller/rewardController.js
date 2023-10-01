const rewardModel = require("../model/rewardSchema");
const CONSTANT = require("../utils/constant") 
const commonFunction = require("../utils/commonFunction");
let httpResponse = CONSTANT.HttpResponse;
const rewardController = {
    "addNewReward" : async function(req,res){
        
        const validation = commonFunction.rewardValidation(req.body)
        console.log(req.body);
        if(validation.status == true){// is validation successfull
            let insertData = {
                                "rewardName"            : req.body.rewardName,
                                "rewardType"            : req.body.rewardType,
                                "region"                : req.body.region,
                                "rate"                  : req.body.rate,
                                "point"                 : req.body.point,
                                "currency"              : req.body.currency,
                                "description"           : req.body.description,
                                "rewardsUrl"            : req.body.rewardsUrl,
                                "startDate"             : req.body.startDate,
                                "endDate"               : req.body.endDate,
                                "duration"              : req.body.duration
                            };

            console.log((req.body));
            let condition = "";
            condition =  {'rewardName': req.body.rewardName};

            rewardModel.find(condition).then((List)=>{
                console.log(List);
                if(List.length==0){
                    const rate = new rewardModel(insertData);
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
                    httpResponse.message = CONSTANT.validation.rewardNameAlreadyExists;
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
    "getAllReward" : function(req,res){
        console.log("getting all rewards");
        let { page, size, sort } = req.query;
        const { limit, offset } = commonFunction.getPagination(page, size);//{ offset, limit }
        rewardModel.find({})
       
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
    "getParticularReward" : function(req,res){
        rewardModel.find({"_id":req.params.rewardId})
        .populate("region")
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
    "updateReward" : function(req,res){
        let updateData = {
            "rewardName"            : req.body.rewardName,
            "rewardType"            : req.body.rewardType,
            "region"                : req.body.region,
            "rate"                  : req.body.rate,
            "point"                 : req.body.point,
            "currency"              : req.body.currency,
            "description"           : req.body.description,
            "rewardsUrl"            : req.body.rewardsUrl,
            "startDate"             : req.body.startDate,
            "endDate"               : req.body.endDate,
            "status"                : req.body.status,
            "dateTime"              : new Date()
        };
        rewardModel.find({"status" : CONSTANT.applicationConstant.activeStatus,
               'rewardName': parseInt(req.body.rewardName),
                '_id': {$ne :  req.params.rewardId}}).then((list)=>{
                if(list.length>0){
                    httpResponse.message = CONSTANT.validation.rewardNameAlreadyExists;
                    httpResponse.data = "";
                    res.status(403).send(httpResponse);
                   
                }else{
                    rewardModel.findOneAndUpdate({"_id":req.params.rewardId},updateData)
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
module.exports = rewardController;