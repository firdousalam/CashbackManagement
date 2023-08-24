var unirest = require("unirest");
module.exports  = {
    sendOTP:function(mobileNo,OTP){
        
        var req = unirest("GET", "https://www.fast2sms.com/dev/bulkV2");

        req.query({
        "authorization": "V02RdBpPKcbg6DzjFG4Y8aSuyMOAsvrwU9qkTiX7LZtlHho35n3fk0SWDaoYAVRpFZwONv1dhgGmqsB7",
        "variables_values": 'Your OTP for ABC365 Verification is : '+OTP+'. it will be expire in 5 Minutes ',
        "route": "otp",
        "numbers": mobileNo
        });

        req.headers({
        "cache-control": "no-cache"
        });


        req.end(function (res) {
        if (res.error) 
        {
            console.log(res);
        }

        console.log(res.body);
        });

    }
}