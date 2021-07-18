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
    let html = `
    <div>Hello ${email},<br/>
      You have registered an account in ${host}. To confirm this account, please use the OTP:<br/>
      <div class="container">
      <h2 style="background-color: gainsboro; padding:8px 16px; border-radius: 8px; margin: 0 auto; width: fit-content;">${otp}</h2>
      </div>
    </div>`;
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