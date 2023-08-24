// service sending email
var nodemailer = require('nodemailer');
require('dotenv').config();

const email = {
    sendAdminOTP : async function(toEmail,OTP){
        
        // Generate SMTP service account from ethereal.email
        nodemailer.createTestAccount((err, account) => {
            if (err) {
                console.error('Failed to create a testing account. ' + err.message);
                return process.exit(1);
            }

            console.log('Credentials obtained, sending message...');

            // Create a SMTP transporter object
            let transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: 'monty12@ethereal.email',
                    pass: 'wB2j7WbvZMhaX9Y1yX'
                }
            });

            // Message object
            let message = {
                from: 'ABC365 <sender@example.com>',
                to: toEmail,
                subject: 'OTP from ABC365',
                text: 'Your OTP for ABC365 Verification is : '+OTP+'. it will be expire in 5 Minutes ',
                html: '<p><b>Your OTP for ABC365 Verification is : '+OTP+'. it will be expire in 5 Minutes </p>'
            };

            transporter.sendMail(message, (err, info) => {
                if (err) {
                    console.log('Error occurred. ' + err.message);
                    return process.exit(1);
                }

                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            });
        });

        /*
        let testAccount = await nodemailer.createTestAccount()
        var transporter =  anodemailer.createTransport({
            host : 
            auth: {
            user: process.env.email,
            pass: process.env.password
            }
        });
        
        var mailOptions = {
            from: process.env.email,
            to: toEmail,
            subject: 'OTP from ABC365',
            text: 'Your OTP for ABC365 Verification is : '+OTP+'. it will be expire in 5 Minutes '
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
        });
        */
    },
    sendUserOTP : async function(toEmail,OTP){
         // Generate SMTP service account from ethereal.email
         nodemailer.createTestAccount((err, account) => {
            if (err) {
                console.error('Failed to create a testing account. ' + err.message);
                return process.exit(1);
            }

            console.log('Credentials obtained, sending message...',toEmail);

            // Create a SMTP transporter object
            let transporter = nodemailer.createTransport({
                secure: false,
                name:account.smtp.host,
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: 'monty12@ethereal.email',
                    pass: 'wB2j7WbvZMhaX9Y1yX'
                }
            });

            // Message object
            let message = {
                from: 'ABC365 <firdousalam2058@gmail.com>',
                to: toEmail,
                subject: 'OTP from ABC365',
                text: 'Your OTP for ABC365 Verification is : '+OTP+'. it will be expire in 5 Minutes ',
                html: '<p>Your OTP for ABC365 Verification is : <b>'+OTP+'</b>. it will be expire in 5 Minutes </p>'
            };

            transporter.sendMail(message, (err, info) => {
                if (err) {
                    console.log('Error occurred. ' + err.message);
                    return process.exit(1);
                }

                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            });
        });
        /*
        let testAccount = await nodemailer.createTestAccount()
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: process.env.email,
            pass: process.env.password
            }
        });
        
        var mailOptions = {
            from: process.env.email,
            to: toEmail,
            subject: 'OTP from abc corp',
            text: 'Dear User, Please find your OTP : '+OTP
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
        });
        */
    }
}
module.exports = email;