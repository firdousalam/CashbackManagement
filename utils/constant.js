let constant = {
    validation : {
        "blankuserName"             : "User Name Cannot be Blank",
        "blankmobileNumberLength"   : "Mobile Number Should be equal to 10 Digits",
        "blankFirstName"            : "First Name Cannot be Blank",
        "blankRewardName"           : "Reward Name Cannot be Blank",
        "blankRewardType"           : "Reward Type Cannot Be Blank",
        "blankRegion"               : "Region Cannot Be Blank",
        "blankRate"                 : "Rate Cannot Be Blank",
        "blankName"                 : "Name Cannot Be Blank",
        "maxNameLength"             : 20,
        "MaxNameLengthMessage"      : "Name should be of Maximum 20 Character",
        "minNameLength"             : 20,
        "mobileNumberLength"        : 10,
        "passwordMaxLength"         : 20,
        "passwordMinLength"         : 8,
        "defaultOffset"             :0,
        "defaultPageSize"           : 10,
        "defaultPage"               : 1,
        "blankCommonMessage"        : "connot be blank",
        "blankAdminType"            : "Please Provide Admin Type",
        "loginUserNotExist"         : "User Not Exist, Please Register And Try Again",
        "passwordNotMatch"          : "Password Not Match",
        "loginSuccess"              : "Login Successful",
        "regionAlreadyExist"        : "Region Name Already Exist",
        "blankEmailMessage"         : "EmailId Connot be Blank",
        "blankPasswordMessage"      : "Please Provide Your Password",
        "blankMobileNo"             : "Mobile No Cannot Be Blank",
        "blankData"                 : "Please Provide Valid Data",
        "adminTypeAlreadyExist"     : "Admin Type Already Exist",
        "blankAdminTypeID"          : "Please Provide AdminType ID",
        "adminWithMobileNoOrEmailExist" : "Admin With Same Mobile No or Email Id Already Exist",
        "blankValidCheck"           : "Please Provide Valid Check",
        "blankValidCheckType"       : "Please Provide Valid Check Type",
        "blankOTP"                  : "Please Provide 6 digits OTP",
        "provideValidOTP"           : "Please Provide Valid 6 Digits OTP",
        "userCreateSuccessfully"    : "User Created Successfully",
        "error"                     : "ERROR",
        "success"                   : "Success",
        "rateNameAlreadyExists"     : "Given Rate Name Already Exist",
        "passwordMaxLengthMessage"  : "Password should be maximum 20 characters long",
        "rewardNameAlreadyExists"   : "Given Reward Name Already Exist",
        "blankRateType"             : "Rate Type Cannot Be Blank",
        "blankStartDate"            : "Start Date Cannot Be Blank",
        "blankEndDate"              : "End Date Cannot Be Blank",
        "invalidStartDateString"    : "Please Provide Valid Start Date",
        "invalidEndDateString"      : "Please Provide Valid End Date",
        "userRewardAlreadyExist"    : "Given Reward Already Added For The user",
        "OTPGenerateSuccessfully"   : "OTP Generated Successfully",
        "userBlankCheck"            : "User Cannot Be Blank",
        "validInsertType"           : "Please Provide Valid Insert Type",
        "walletTypeBlank"           : "Wallet Type Cannot Be Blank",
        "validWalletType"           : "Please Provide Valid Type",
        "blankAmount"               : "Amount Cannot Be Blank",
        "InSufficientBalance"       : "In Sufficient Balance",
        "blankCashBackId"           : "Please Select Cashback Details",
        "cashbackAlreadyUsed"       : "Cashback Already Being Used",
        "noAccess"                  : "User Dont Have Access To Perform This Task"


    },
    responseMessage : {
        "userCreatedSuccess" : "User Created Successfully"
    },
    errorMessage : {
        "emailDuplicate" : "emailId Already Exist"
    },
    responseCode : {
        "success"       : 200,
        "notExist"      : 404,
        "error"         : 500,
        "validation"    : 403
    },
    applicationConstant : {
        activeStatus                : "ACTIVE",
        inActiveStatus              : "INACTIVE",
        statusEnum                  : ["ACTIVE","INACTIVE"],
        rateTypeEnum                : ["POINT","MONEY","CASHBACK"],
        defaultRateType             : "POINT",
        rewardsTypeEnum             : ["YOUTUBE ADS","WALLET","BUY"],
        defaultRewardsType          : "YOUTUBE ADS",
        typeCheck                   : ['EMAIL','PHONE'],
        emailType                   : "EMAIL",
        phoneType                   : "PHONE",
        OTPTimeout                  : 10,
        inertedByEnum               : ['USER','ADMIN'],
        insertedByUser              : "USER",
        insertedByAdmin             : "ADMIN",
        walletAndRedeemEnum         : ['WALLET','REDEEM'],
        walletType                  : "WALLET",
        redeemType                  : "REDEEM"
    },
    JWT : {
        privateKey : "VVVVBBBVBVBVVB",
        algorithm  : "RS256"
    },
    algorithm : 'HS256',
    expireTime: 86400,
    HttpResponse : {
        data : "",
        message : ""
    }
 }
module.exports = constant;