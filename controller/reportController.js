const walletModel = require("../model/walletSchema");
const CONSTANT = require("../utils/constant") 
const commonFunction = require("../utils/commonFunction");
let httpResponse = CONSTANT.HttpResponse;
const reportController = {
    "totalCashBackEarnToday" : async function(req,res){
        // we will call one function and do validation from there
       let list =  await walletModel.aggregate([
        {
          '$match': {
            'dateTime': {
              '$gte': commonFunction.getTodayMidNightDateTime(), 
              '$lt': new Date()
            }, 
            'walletType': CONSTANT.applicationConstant.walletType
          }
        }, {
          '$group': {
            '_id': "Total Cashback Earned Today", 
            'totalCashBackAmount': {
              '$sum': '$amount'
            }, 
            'count': {
              '$sum': 1
            }
          }
        }, {
          '$sort': {
            'totalCashBackAmount': -1
          }
        }
      ]);
        httpResponse.message = CONSTANT.validation.success;
        httpResponse.data = list;
        res.status(200).send(httpResponse);
    },
    "totalCashBackRedeemToday" : async function(req,res){
        let list =  await walletModel.aggregate([
            {
              '$match': {
                'dateTime': {
                  '$gte': commonFunction.getTodayMidNightDateTime(), 
                  '$lt': new Date()
                }, 
                'walletType': CONSTANT.applicationConstant.redeemType
              }
            }, {
              '$group': {
                '_id': "Total Cashback Redeemed Today", 
                'totalRedeemAmount': {
                  '$sum': '$amount'
                }, 
                'count': {
                  '$sum': 1
                }
              }
            }, {
              '$sort': {
                'totalCashBackAmount': -1
              }
            }
          ]);
        httpResponse.message = CONSTANT.validation.success;
        httpResponse.data = list;
        res.status(200).send(httpResponse);
    },
    "totalCashBackEarned" : async function(req,res){
        
       let list =  await walletModel.aggregate([
        {
          '$match': {
            'walletType': CONSTANT.applicationConstant.walletType
          }
        }, {
          '$group': {
            '_id': "Total Cashback Earned", 
            'totalCashBackAmount': {
              '$sum': '$amount'
            }, 
            'count': {
              '$sum': 1
            }
          }
        }, {
          '$sort': {
            'totalCashBackAmount': -1
          }
        }
      ]);
        httpResponse.message = CONSTANT.validation.success;
        httpResponse.data = list;
        res.status(200).send(httpResponse);
    },
    "totalCashBackRedeem" : async function(req,res){
        let list =  await walletModel.aggregate([
            {
              '$match': {
                'walletType': CONSTANT.applicationConstant.redeemType
              }
            }, {
              '$group': {
                '_id': "Total Cashback Redeemed", 
                'totalRedeemAmount': {
                  '$sum': '$amount'
                }, 
                'count': {
                  '$sum': 1
                }
              }
            }, {
              '$sort': {
                'totalCashBackAmount': -1
              }
            }
          ]);
        httpResponse.message = CONSTANT.validation.success;
        httpResponse.data = list;
        res.status(200).send(httpResponse);
    },
    "totalCashBackEarnByRegionAndDate" : async function(req,res){
        let match = { 'walletType': CONSTANT.applicationConstant.walletType}
        if(req.query.region){
            match.region = req.query.region;
        }
        if(req.query.startDate != '' && req.query.endDate != ''){
            match.dateTime = {
                '$gte': new Date(req.query.startDate), 
                '$lt': new Date(req.query.endDate)
              }
        }
        console.log(match)
       let list =  await walletModel.aggregate([
        {
          '$match': match
        }, {
          '$group': {
            '_id': "Total Cashback Earned", 
            'totalCashBackAmount': {
              '$sum': '$amount'
            }, 
            'count': {
              '$sum': 1
            }
          }
        }, {
          '$sort': {
            'totalCashBackAmount': -1
          }
        }
      ]);
        httpResponse.message = CONSTANT.validation.success;
        httpResponse.data = list;
        res.status(200).send(httpResponse);
    },
    "totalCashBackRedeemByRegionAndDate" : async function(req,res){
        let match = { 'walletType': CONSTANT.applicationConstant.walletType}
        if(req.query.region){
            match.region = req.query.region;
        }
        if(req.query.startDate != '' && req.query.endDate != ''){
            match.dateTime = {
                '$gte': new Date(req.query.startDate), 
                '$lt': new Date(req.query.endDate)
              }
        }
        console.log(match)
        let list =  await walletModel.aggregate([
            {
              '$match': match
            }, {
              '$group': {
                '_id': "Total Cashback Redeemed", 
                'totalRedeemAmount': {
                  '$sum': '$amount'
                }, 
                'count': {
                  '$sum': 1
                }
              }
            }, {
              '$sort': {
                'totalCashBackAmount': -1
              }
            }
          ]);
        httpResponse.message = CONSTANT.validation.success;
        httpResponse.data = list;
        res.status(200).send(httpResponse);
    },
    "CashBackEarnByRegionAndDate" : async function(req,res){
        let match = { 'walletType': CONSTANT.applicationConstant.walletType}
        if(req.query.region){
            match.region = req.query.region;
        }
        if(req.query.startDate != '' && req.query.endDate != ''){
            match.dateTime = {
                '$gte': new Date(req.query.startDate), 
                '$lt': new Date(req.query.endDate)
              }
        }
        let { page, size, sort } = req.query;
        const { limit, offset } = commonFunction.getPagination(page, size);//{ offset, limit }
        walletModel.find(match,{ offset, limit })
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
    "CashBackRedeemByRegionAndDate" : async function(req,res){
        let match = { 'walletType': CONSTANT.applicationConstant.walletType}
        if(req.query.region){
            match.region = req.query.region;
        }
        if(req.query.startDate != '' && req.query.endDate != ''){
            match.dateTime = {
                '$gte': new Date(req.query.startDate), 
                '$lt': new Date(req.query.endDate)
              }
        }
        let { page, size, sort } = req.query;
        const { limit, offset } = commonFunction.getPagination(page, size);//{ offset, limit }
        walletModel.find(match)
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
    }
}
module.exports = reportController;