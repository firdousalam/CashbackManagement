require('dotenv').config();

module.exports  = {
    sendOTP:function(mobileNo,OTP){
        const https = require('https');
        const querystring = require('querystring');
        console.log("Mobile No",mobileNo);
        const postData = querystring.stringify({
            'un':  process.env.MobileUserName,
            'pwd': process.env.MobilePassword,
            'dstno': mobileNo,
            'msg': 'Your OTP for ABC365 Verification is : '+OTP+'. it will be expire in 10 Minutes ',
            'type': '1',
            'agreedterm': 'YES',
            'sendid': '63001'
        });

        console.log(postData);
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
            console.log(`statusCode: `,res);

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