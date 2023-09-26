const CONSTANT = require("../utils/constant");
const validationFunction = require("../validation/userValidation");
const jwt                 = require("jsonwebtoken");
const bcrypt              = require("bcrypt");             
require('dotenv').config()
let secretKey           = process.env.JWT_SECRET_KEY;

const commonFunction = {
    "pinGenerationValidation" : function(body){
        let returnString = {"status" : true,"statusCode":"","message" : "success"}
        if(!validationFunction.blankCheck(body)){
          returnString.status = false;
          returnString.statusCode = CONSTANT.responseCode.validation;
          returnString.message = CONSTANT.validation.blankCommonMessage;
          return returnString;
        }
        if(!validationFunction.blankCheck(body.pin)){
          returnString.status = false;
          returnString.statusCode = CONSTANT.responseCode.validation;
          returnString.message = CONSTANT.validation.pinValidation;
          return returnString;
      }
        
        return returnString;
    },
    "userValidation" : function(body){
        let returnString = {"status" : true,"statusCode":"","message" : "success"}
       if(!validationFunction.blankCheck(body)){
            returnString.status = false;
            returnString.statusCode = CONSTANT.responseCode.validation;
            returnString.message = CONSTANT.validation.blankCommonMessage;
            return returnString;

       }
       /*
       // Validating First Name //
       if(!validationFunction.blankCheck(body.firstName)){
            returnString.status = false;
            returnString.statusCode = CONSTANT.responseCode.validation;
            returnString.message = CONSTANT.validation.blankFirstName;
            return returnString;
        }
        if(!validationFunction.maxCharacterLengthCheck(body.firstName,CONSTANT.validation.maxNameLength)){
            returnString.status = false;
            returnString.statusCode = CONSTANT.responseCode.validation;
            returnString.message = CONSTANT.validation.MaxNameLengthMessage;
            return returnString;
        }
        */
        if(!validationFunction.blankCheck(body.region)){
          returnString.status = false;
          returnString.statusCode = CONSTANT.responseCode.validation;
          returnString.message = CONSTANT.validation.blankRegionSelection;
          return returnString;
      }
        if(!validationFunction.blankCheck(body.mobileNo)){
            returnString.status = false;
            returnString.statusCode = CONSTANT.responseCode.validation;
            returnString.message = CONSTANT.validation.blankMobileNo;
            return returnString;
        }
        

        return returnString;
    },
    "adminValidation" : function(body){
        let returnString = {"status" : true,"statusCode":"","message" : "success"}
       /*
       "firstName" : req.body.firstName,
        "lastName" : req.body.lastName,
        "password" : req.body.password,
        "address" : req.body.address,
        "emailId" : req.body.emailId,
        "mobileNo" : parseInt(req.body.mobileNo)
        */
       // checking Body //
       if(!validationFunction.blankCheck(body)){
            returnString.status = false;
            returnString.statusCode = CONSTANT.responseCode.validation;
            returnString.message = CONSTANT.validation.blankCommonMessage;
            return returnString;

       }
       // Validating First Name //
       if(!validationFunction.blankCheck(body.firstName)){
            returnString.status = false;
            returnString.statusCode = CONSTANT.responseCode.validation;
            returnString.message = CONSTANT.validation.blankFirstName;
            return returnString;
        }
        if(!validationFunction.maxCharacterLengthCheck(body.firstName,CONSTANT.validation.maxNameLength)){
            returnString.status = false;
            returnString.statusCode = CONSTANT.responseCode.validation;
            returnString.message = CONSTANT.validation.MaxNameLengthMessage;
            return returnString;
        }
        // validating Password //
        if(!validationFunction.blankCheck(body.password)){
            returnString.status = false;
            returnString.statusCode = CONSTANT.responseCode.validation;
            returnString.message = CONSTANT.validation.blankPasswordMessage;
            return returnString;
        }
        if(!validationFunction.maxCharacterLengthCheck(body.password,CONSTANT.validation.passwordMaxLength)){
            returnString.status = false;
            returnString.statusCode = CONSTANT.responseCode.validation;
            returnString.message = CONSTANT.validation.passwordMaxLengthMessage;
            return returnString;
        }
        if(!validationFunction.blankCheck(body.adminType)){
            returnString.status = false;
            returnString.statusCode = CONSTANT.responseCode.validation;
            returnString.message = CONSTANT.validation.blankAdminType;
            return returnString;
        }
        return returnString;
    },
    "adminValidationUpdate" : function(body){
      let returnString = {"status" : true,"statusCode":"","message" : "success"}
     /*
     "firstName" : req.body.firstName,
      "lastName" : req.body.lastName,
      "password" : req.body.password,
      "address" : req.body.address,
      "emailId" : req.body.emailId,
      "mobileNo" : parseInt(req.body.mobileNo)
      */
     // checking Body //
     if(!validationFunction.blankCheck(body)){
          returnString.status = false;
          returnString.statusCode = CONSTANT.responseCode.validation;
          returnString.message = CONSTANT.validation.blankCommonMessage;
          return returnString;

     }
     // Validating First Name //
     if(!validationFunction.blankCheck(body.firstName)){
          returnString.status = false;
          returnString.statusCode = CONSTANT.responseCode.validation;
          returnString.message = CONSTANT.validation.blankFirstName;
          return returnString;
      }
      if(!validationFunction.maxCharacterLengthCheck(body.firstName,CONSTANT.validation.maxNameLength)){
          returnString.status = false;
          returnString.statusCode = CONSTANT.responseCode.validation;
          returnString.message = CONSTANT.validation.MaxNameLengthMessage;
          return returnString;
      }
      if(!validationFunction.blankCheck(body.adminType)){
          returnString.status = false;
          returnString.statusCode = CONSTANT.responseCode.validation;
          returnString.message = CONSTANT.validation.blankAdminType;
          return returnString;
      }
      return returnString;
  },
    "generateRandonPID" : function(){
          var minm = 100000;
          var maxm = 999999;
          return Math.floor(Math
          .random() * (maxm - minm + 1)) + minm;

    },
    "cleanLoggerFile" : function(){
        const errorLogFile =  path.resolve(__dirname, "../logger/errorLogger.log");
        const infoLogFile =  path.resolve(__dirname, "../logger/infoLogger.log");
        const warningLogFile =  path.resolve(__dirname, "../logger/warningLogger.log");
       
        fs.writeFile(errorLogFile, "", err => {
            if (err) {
              console.error(err);
            }
            console.log("error log has been cleaned")
          });
          fs.writeFile(infoLogFile, "", err => {
            if (err) {
              console.error(err);
            }
            console.log("infoLogFile has been cleaned")
          });
          fs.writeFile(warningLogFile, "", err => {
            if (err) {
              console.error(err);
            }
            // file written successfully
            console.log("warningLogFile has been cleaned")
          });
    },
    loginUserValidation : function(body){
      let returnString = {"status" : true,"statusCode":"","message" : "success"}
      if(!validationFunction.blankCheck(body)){
        returnString.status = false;
        returnString.statusCode = CONSTANT.responseCode.validation;
        returnString.message = CONSTANT.validation.blankCommonMessage;
        return returnString;

      }
      if(!validationFunction.blankCheck(body.emailId)){
        returnString.status = false;
        returnString.statusCode = CONSTANT.responseCode.validation;
        returnString.message = CONSTANT.validation.blankEmailMessage;
        return returnString;
      }
      if(!validationFunction.blankCheck(body.password)){
        returnString.status = false;
        returnString.statusCode = CONSTANT.responseCode.validation;
        returnString.message = CONSTANT.validation.blankPasswordMessage;
        return returnString;
      }
      return returnString;
    },
    "encryptJWT" : function(data,callback){
     
      jwt.sign(data, secretKey, {
        "algorithm": CONSTANT.algorithm,
        "expiresIn": CONSTANT.expireTime // expires in 24 hours
      }, function(err, token) {
        callback(err,token);
      });

    },
    "decryptJWT" : function(token,callback){
      jwt.verify(token, secretKey, function(err, decoded) {
        callback(err,decoded);
      });
    }, 
    "adminForgotPasswordValidation" : function(body){
      let returnString = {"status" : true,"statusCode":"","message" : "success"}
      if(!validationFunction.blankCheck(body)){
        returnString.status = false;
        returnString.statusCode = CONSTANT.responseCode.validation;
        returnString.message = CONSTANT.validation.blankCommonMessage;
        return returnString;
      }
      if(!validationFunction.blankCheck(body.type)){
        returnString.status = false;
        returnString.statusCode = CONSTANT.responseCode.validation;
        returnString.message = CONSTANT.validation.blankValidCheckType;
        return returnString;
      }
      if(!(CONSTANT.applicationConstant.typeCheck).includes(body.type)){
          returnString.status = false;
          returnString.statusCode = CONSTANT.responseCode.validation;
          returnString.message = CONSTANT.validation.blankValidCheckType;
          return returnString;
      }
      if(body.type == CONSTANT.applicationConstant.emailType){
        if(!validationFunction.blankCheck(body.emailId)){
          returnString.status = false;
          returnString.statusCode = CONSTANT.responseCode.validation;
          returnString.message = CONSTANT.validation.blankEmailMessage;
          return returnString;
        }
      }
      if(body.type == CONSTANT.applicationConstant.phoneType){
        if(!validationFunction.blankCheck(body.mobileNo)){
          returnString.status = false;
          returnString.statusCode = CONSTANT.responseCode.validation;
          returnString.message = CONSTANT.validation.blankmobileNumberLength;
          return returnString;
        }
      }
      return returnString
    },
    "adminMatchOTPValidation" : function(body){
      let returnString = {"status" : true,"statusCode":"","message" : "success"}
      if(!validationFunction.blankCheck(body)){
        returnString.status = false;
        returnString.statusCode = CONSTANT.responseCode.validation;
        returnString.message = CONSTANT.validation.blankCommonMessage;
        return returnString;
      }
      if(!validationFunction.blankCheck(body.type)){
        returnString.status = false;
        returnString.statusCode = CONSTANT.responseCode.validation;
        returnString.message = CONSTANT.validation.blankValidCheckType;
        return returnString;
      }
      console.log()
      if(!(CONSTANT.applicationConstant.typeCheck).includes(body.type)){
          returnString.status = false;
          returnString.statusCode = CONSTANT.responseCode.validation;
          returnString.message = CONSTANT.validation.blankValidCheckType;
          return returnString;
      }
      if(body.type == CONSTANT.applicationConstant.emailType){
        if(!validationFunction.blankCheck(body.emailId)){
          returnString.status = false;
          returnString.statusCode = CONSTANT.responseCode.validation;
          returnString.message = CONSTANT.validation.blankEmailMessage;
          return returnString;
        }
      }
      if(body.type == CONSTANT.applicationConstant.phoneType){
        if(!validationFunction.blankCheck(body.mobileNo)){
          returnString.status = false;
          returnString.statusCode = CONSTANT.responseCode.validation;
          returnString.message = CONSTANT.validation.blankmobileNumberLength;
          return returnString;
        }
      }
      if(!validationFunction.blankCheck(body.otp)){
        returnString.status = false;
        returnString.statusCode = CONSTANT.responseCode.validation;
        returnString.message = CONSTANT.validation.blankOTP;
        return returnString;
      }
      if(!validationFunction.blankCheck(body.password)){
        returnString.status = false;
        returnString.statusCode = CONSTANT.responseCode.validation;
        returnString.message = CONSTANT.validation.blankPasswordMessage;
        return returnString;
      }
      return returnString
    },
    "adminOTPLoginValidation" : function(body){
      let returnString = {"status" : true,"statusCode":"","message" : "success"}
      if(!validationFunction.blankCheck(body)){
        returnString.status = false;
        returnString.statusCode = CONSTANT.responseCode.validation;
        returnString.message = CONSTANT.validation.blankCommonMessage;
        return returnString;
      }
      if(!validationFunction.blankCheck(body.type)){
        returnString.status = false;
        returnString.statusCode = CONSTANT.responseCode.validation;
        returnString.message = CONSTANT.validation.blankValidCheckType;
        return returnString;
      }
      if(!(CONSTANT.applicationConstant.typeCheck).includes(body.type)){
          returnString.status = false;
          returnString.statusCode = CONSTANT.responseCode.validation;
          returnString.message = CONSTANT.validation.blankValidCheckType;
          return returnString;
      }
      if(body.type == CONSTANT.applicationConstant.emailType){
        if(!validationFunction.blankCheck(body.emailId)){
          returnString.status = false;
          returnString.statusCode = CONSTANT.responseCode.validation;
          returnString.message = CONSTANT.validation.blankEmailMessage;
          return returnString;
        }
      }
      if(body.type == CONSTANT.applicationConstant.phoneType){
        if(!validationFunction.blankCheck(body.mobileNo)){
          returnString.status = false;
          returnString.statusCode = CONSTANT.responseCode.validation;
          returnString.message = CONSTANT.validation.blankmobileNumberLength;
          return returnString;
        }
      }
      if(!validationFunction.blankCheck(body.otp)){
        returnString.status = false;
        returnString.statusCode = CONSTANT.responseCode.validation;
        returnString.message = CONSTANT.validation.blankOTP;
        return returnString;
      }
      return returnString
    },
    getOTPTimeoutTime : function(){
      return  new Date().getTime() - 1000 * 60 * CONSTANT.applicationConstant.OTPTimeout;
    },
    generateBCryptHash : function(data,cb){
      bcrypt.genSalt(10, function (saltError, salt) {
        console.log(saltError,"saltError")
          bcrypt.hash(data, salt, function(hashError, hash) {
            console.log("hashError",hashError)
            console.log(hash)
             cb(hash);
          })
      })
    },
    "walletRateValidation" : function(body){
      let returnString = {"status" : true,"statusCode":"","message" : "success"}
     if(!validationFunction.blankCheck(body)){
          returnString.status = false;
          returnString.statusCode = CONSTANT.responseCode.validation;
          returnString.message = CONSTANT.validation.blankCommonMessage;
          return returnString;

     }
     if(!validationFunction.blankCheck(body.name)){
          returnString.status = false;
          returnString.statusCode = CONSTANT.responseCode.validation;
          returnString.message = CONSTANT.validation.blankName;
          return returnString;
      }
      if(!validationFunction.blankCheck(body.rate)){
          returnString.status = false;
          returnString.statusCode = CONSTANT.responseCode.validation;
          returnString.message = CONSTANT.validation.blankRate;
          return returnString;
      }
      if(!validationFunction.blankCheck(body.region)){
          returnString.status = false;
          returnString.statusCode = CONSTANT.responseCode.validation;
          returnString.message = CONSTANT.validation.blankRegion;
          return returnString;
      }
      if(!validationFunction.blankCheck(body.rateType)){
        returnString.status = false;
        returnString.statusCode = CONSTANT.responseCode.validation;
        returnString.message = CONSTANT.validation.blankRateType;
        return returnString;
    }
      return returnString;
  },
  
  "rewardValidation" : function(body){                        
    let returnString = {"status" : true,"statusCode":"","message" : "success"}
    console.log(body);
   if(!validationFunction.blankCheck(body)){
        returnString.status = false;
        returnString.statusCode = CONSTANT.responseCode.validation;
        returnString.message = CONSTANT.validation.blankCommonMessage;
        return returnString;

   }
   if(!validationFunction.blankCheck(body.rewardName)){
        returnString.status = false;
        returnString.statusCode = CONSTANT.responseCode.validation;
        returnString.message = CONSTANT.validation.blankRewardName;
        return returnString;
    }
    if(!validationFunction.blankCheck(body.rewardType)){
        returnString.status = false;
        returnString.statusCode = CONSTANT.responseCode.validation;
        returnString.message = CONSTANT.validation.blankRewardType;
        return returnString;
    }
    if(!validationFunction.blankCheck(body.region)){
        returnString.status = false;
        returnString.statusCode = CONSTANT.responseCode.validation;
        returnString.message = CONSTANT.validation.blankRegion;
        return returnString;
    }
    if(!validationFunction.blankCheck(body.startDate)){
      returnString.status = false;
      returnString.statusCode = CONSTANT.responseCode.validation;
      returnString.message = CONSTANT.validation.blankStartDate;
      return returnString;
    }
    if(!validationFunction.blankCheck(body.endDate)){
      returnString.status = false;
      returnString.statusCode = CONSTANT.responseCode.validation;
      returnString.message = CONSTANT.validation.blankEndDate;
      return returnString;
    }
    if(isNaN(Date.parse(body.startDate))){
      returnString.status = false;
      returnString.statusCode = CONSTANT.responseCode.validation;
      returnString.message = CONSTANT.validation.invalidStartDateString;
      return returnString;
    }
    if(isNaN(Date.parse(body.endDate))){
      returnString.status = false;
      returnString.statusCode = CONSTANT.responseCode.validation;
      returnString.message = CONSTANT.validation.invalidEndDateString;
      return returnString;
    }
    return returnString;
  },
  "walletValidation" : function(body){
    let returnString = {"status" : true,"statusCode":"","message" : "success"}
    if(!validationFunction.blankCheck(body)){
      returnString.status = false;
      returnString.statusCode = CONSTANT.responseCode.validation;
      returnString.message = CONSTANT.validation.blankCommonMessage;
      return returnString;
    }
    if(!validationFunction.blankCheck(body.user)){
      returnString.status = false;
      returnString.statusCode = CONSTANT.responseCode.validation;
      returnString.message = CONSTANT.validation.userBlankCheck;
      return returnString;
    }
    if(!(CONSTANT.applicationConstant.inertedByEnum).includes(body.insertedBy)){
        returnString.status = false;
        returnString.statusCode = CONSTANT.responseCode.validation;
        returnString.message = CONSTANT.validation.validInsertType;
        return returnString;
    }
   
    if(!validationFunction.blankCheck(body.reward)){
      returnString.status = false;
      returnString.statusCode = CONSTANT.responseCode.validation;
      returnString.message = CONSTANT.validation.blankRewardName;
      return returnString;
    }
    if(!validationFunction.blankCheck(body.walletType)){
      returnString.status = false;
      returnString.statusCode = CONSTANT.responseCode.validation;
      returnString.message = CONSTANT.validation.walletTypeBlank;
      return returnString;
    }
    if(!(CONSTANT.applicationConstant.walletAndRedeemEnum).includes(body.walletType)){
      returnString.status = false;
      returnString.statusCode = CONSTANT.responseCode.validation;
      returnString.message = CONSTANT.validation.validWalletType;
      return returnString;
    }
    if(!validationFunction.blankCheck(body.amount)){
      returnString.status = false;
      returnString.statusCode = CONSTANT.responseCode.validation;
      returnString.message = CONSTANT.validation.blankAmount;
      return returnString;
    }
    return returnString
  },
  "userIdValidation" : function(body){
    let returnString = {"status" : true,"statusCode":"","message" : "success"};
    console.log(body);
    if(!validationFunction.blankCheck(body)){
      returnString.status = false;
      returnString.statusCode = CONSTANT.responseCode.validation;
      returnString.message = CONSTANT.validation.blankCommonMessage;
      return returnString;
    }
    if(!validationFunction.blankCheck(body.userId)){
      returnString.status = false;
      returnString.statusCode = CONSTANT.responseCode.validation;
      returnString.message = CONSTANT.validation.userBlankCheck;
      return returnString;
    }
    return returnString
  },
  "redeemValidation" : function(body){
    let returnString = {"status" : true,"statusCode":"","message" : "success"}
    if(!validationFunction.blankCheck(body)){
      returnString.status = false;
      returnString.statusCode = CONSTANT.responseCode.validation;
      returnString.message = CONSTANT.validation.blankCommonMessage;
      return returnString;
    }
    if(!validationFunction.blankCheck(body.user)){
      returnString.status = false;
      returnString.statusCode = CONSTANT.responseCode.validation;
      returnString.message = CONSTANT.validation.userBlankCheck;
      return returnString;
    }
    if(!(CONSTANT.applicationConstant.inertedByEnum).includes(body.insertedBy)){
        returnString.status = false;
        returnString.statusCode = CONSTANT.responseCode.validation;
        returnString.message = CONSTANT.validation.validInsertType;
        return returnString;
    }
    if(!validationFunction.blankCheck(body.redeemId)){
      returnString.status = false;
      returnString.statusCode = CONSTANT.responseCode.validation;
      returnString.message = CONSTANT.validation.blankCashBackId;
      return returnString;
    }
    return returnString
  },
  getWalletAndRedeemDetails(details,user,callback){
    let data = {
      walletAmount : 0,
      radeemAmount : 0
    }
    console.log(details);
    if(details.length == 0){
      callback(data)
    }
    for(let i=0;i<details.length;i++){
      if(details[i]._id.user == user ){
        if(details[i]._id.walletType == CONSTANT.applicationConstant.walletType){
          data.walletAmount = details[i].total
        }
        if(details[i]._id.walletType == CONSTANT.applicationConstant.redeemType){
          data.radeemAmount = details[i].total
        }
      }
      if(i == details.length-1){
        callback(data)
      }
    }
  },
  regionIdValidation : function(body){
    let returnString = {"status" : true,"statusCode":"","message" : "success"}
    if(!validationFunction.blankCheck(body)){
      returnString.status = false;
      returnString.statusCode = CONSTANT.responseCode.validation;
      returnString.message = CONSTANT.validation.blankCommonMessage;
      return returnString;
    }
    if(!validationFunction.blankCheck(body.region)){
      returnString.status = false;
      returnString.statusCode = CONSTANT.responseCode.validation;
      returnString.message = CONSTANT.validation.blankRegion;
      return returnString;
    }
    return returnString
  },
  getPagination : (page, size) => {
    if(!page){
      page = 0;
    }
    if(!size){
      size = 0;
    }

    const limit = size ? +size : CONSTANT.validation.defaultPageSize;
    const offset = page ? page * limit : CONSTANT.validation.defaultOffset;
  
    return { limit, offset };
  },
  getTodayMidNightDateTime : ()=>{
   

    var todaydate = new Date();
    
      return new Date(todaydate.getFullYear() , (todaydate.getMonth()),todaydate.getDate(),0,0,1)
  }
}
module.exports = commonFunction;