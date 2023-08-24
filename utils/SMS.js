require('dotenv').config();

module.exports  = {
    sendOTP:function(mobileNo,OTP){

        /*
        
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
        */

        const https = require('https');
        const querystring = require('querystring');

        const postData = querystring.stringify({
        'un':  process.env.MobileUserName,
        'pwd': process.env.MobilePassword,
        'dstno': mobileNo,
        'msg': 'Your OTP for ABC365 Verification is : '+OTP+'. it will be expire in 5 Minutes ',
        'type': '1',
        'agreedterm': 'YES',
        'sendid': '63001'
        });

        const options = {
            hostname: 'www.isms.com.my',
            path: '/isms_send_all_id.php',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = https.request(options, (res) => {
        console.log(`statusCode: `);

        res.on('data', (d) => {
            process.stdout.write(d);
        });
        });

        req.on('error', (error) => {
            console.error(error);
        });

        req.write(postData);
        req.end();

    }
}