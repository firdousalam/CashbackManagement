const {mongoose,Schema} = require("mongoose");
const CONSTANT  = require("../utils/constant");

const RewardSchema = new mongoose.Schema({
  rewardName : {
    type      : String,
    required  : true,
    trim      : true
  },
  rewardType : {
      type      : String,
      default   : CONSTANT.applicationConstant.defaultRewardsType,
      enum      : CONSTANT.applicationConstant.rewardsTypeEnum
  },
  region  : {
    type        : Schema.Types.ObjectId,ref:'region'},
    rate : {
      type: Number
    },
    point : {
      type: Number
    },
    currency : {
      type: String
    },
  description : {
    type: String
  },
  rewardsUrl : {
    type: String
  },
  dateTime : {type : Date,default: Date.now},
  status : {
    type : String,
    default : CONSTANT.applicationConstant.activeStatus,
    enum    :  CONSTANT.applicationConstant.statusEnum
  },
  duration : {type : Number},
  startDate : {type : Date},
  endDate : {type : Date}
  
});

const reward = mongoose.model("reward", RewardSchema); // users
module.exports = reward;