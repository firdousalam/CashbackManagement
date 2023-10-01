const {mongoose,Schema} = require("mongoose");
const CONSTANT  = require("../utils/constant");

const SavingSchema = new mongoose.Schema({
    user : { type : Schema.Types.ObjectId,ref:'User'},
    amount : {
        type: Number
    },
    durationInMonth : {
        type: Number
    },
    rateOfInterest : {
        type: Number
    },
    dateTime : {type : Date,default: Date.now},
    status : {
        type : String,
        default : CONSTANT.applicationConstant.activeStatus,
        enum    :  CONSTANT.applicationConstant.statusEnum
    },
    redeemStatus : {
        type : String,
        default : CONSTANT.applicationConstant.activeStatus,
        enum    :  CONSTANT.applicationConstant.statusEnum
    },
    maturityDate : {type : Date,default: Date.now},
    autoRenewSaveAmountInterest : {
        type : Boolean,
        default : false 
    },
    autoRenewSaveAmountOnly : {
        type : Boolean,
        default : false 
    },
    amountAddPlusInterest : {
        type : Boolean,
        default : false 
    },


});

const saving = mongoose.model("saving", SavingSchema); 
module.exports = saving;