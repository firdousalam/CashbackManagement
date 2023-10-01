const {mongoose,Schema} = require("mongoose");
const CONSTANT  = require("../utils/constant");

const rateSchema = new mongoose.Schema({
  name : {
    type: String,
    required : true,
    trim : true
  },
   rate : {
    type: Number
  },
  point : {
    type: Number
  },
  currency : {
    type: String
  },
  dateTime : {type : Date, default: Date.now},
  region      : {type : Schema.Types.ObjectId,ref:'region'},
  status : {
    type : String,
    default : CONSTANT.applicationConstant.activeStatus,
    enum    :  CONSTANT.applicationConstant.statusEnum
  },
  rateType : {
    type : String,
    default : CONSTANT.applicationConstant.defaultRateType,
    enum    :  CONSTANT.applicationConstant.rateTypeEnum
  }
  
});

const rate = mongoose.model("rate", rateSchema); // users
module.exports = rate;