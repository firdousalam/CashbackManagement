const {mongoose,Schema} = require("mongoose");
const CONSTANT  = require("../utils/constant");

const WalletSchema = new mongoose.Schema({
  user : { type : Schema.Types.ObjectId,ref:'User'},
  insertedBy : {
    type    : String,
    default : CONSTANT.applicationConstant.insertedByUser,
    enum    :  CONSTANT.applicationConstant.inertedByEnum
  },
  adminId   : { type : Schema.Types.ObjectId,ref:'Admin'},
  reward    : { type : Schema.Types.ObjectId,ref:'reward'},
  region    : { type : Schema.Types.ObjectId,ref:'region'},
  redeemId  : { type : Schema.Types.ObjectId,ref:'wallet'},
  description : {
    type: String
  },
  walletType : {
    type    : String,
    default : CONSTANT.applicationConstant.walletType,
    enum    :  CONSTANT.applicationConstant.walletAndRedeemEnum
  },
  dateTime : {type : Date, default:Date.now},
  status : {
    type : String,
    default : CONSTANT.applicationConstant.activeStatus,
    enum    :  CONSTANT.applicationConstant.statusEnum
  },
  startDate : {type : Date},
  endDate : {type : Date},
  amount : {
    type : Number
  },

  
});

const wallet = mongoose.model("wallet", WalletSchema); // users
module.exports = wallet;