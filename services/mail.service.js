var nodemailer = require('nodemailer');
const config = require('../config/config.json').mailsetting;
const host = "localhost:3000";

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.email,
    pass: config.password
  }
});

var mailOptions = {
  from: config.email,
  to: '',
  subject: '',
  html: ''
};

exports.SendEmailRegisterConfirmation = async function(email, otp){
    let confirmLink = CreateConfirmationLink(email, otp);
    let subject = "Register Confirmation";
    let html = `<div>Hello ${email},<br/>You have registered an account in ${host}. To confirm this account, please click on the link <a href='https://${confirmLink.toString()}'>CONFIRM_ACCOUNT</a><br/>Or use the OTP <span style="background-color: gray; padding: 5px; border-radius: 4px">${otp}</span></div>`;
    mailOptions.to = email;
    mailOptions.subject = subject;
    mailOptions.html = html;
    SendMail(mailOptions);
}

function SendMail(mailOptions){
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
}

function CreateConfirmationLink(email, otp){
    return `${host}/auth/confirm?email=${email}&otp=${otp}`;
}