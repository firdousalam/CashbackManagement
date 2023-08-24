const {mongoose,Schema} = require("mongoose");
const CONSTANT  = require("../utils/constant");

const WalletSchema = new mongoose.Schema({
  user : { type : Schema.Types.ObjectId,ref:'User'},
  reward : {
    rate : { type : Schema.Types.ObjectId,ref:'reward'}
  },
  description : {
    type: String
  },
  walletType : {
    type: String
  },
  dateTime : {type : Date, default:Date.now},
  status : {
    type : String,
    default : CONSTANT.applicationConstant.activeStatus,
    enum    :  CONSTANT.applicationConstant.statusEnum
  },
  startDate : {type : Date},
  endDate : {type : Date},
  walletAmount : {
    type : number
  },
  walletTransaction : [{
    dateTime : {type : Date, default:Date.now},
    walletUser : {type : Number},
    description : {type : String}
  }],
  WalletRedeemStatus : { type : String}
  
});

const wallet = mongoose.model("wallet", WalletSchema); // users
module.exports = wallet;