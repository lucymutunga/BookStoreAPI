require("dotenv").config();
// const nodemailer = require("nodemailer");
const email_config={
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    requireTLS:true,
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PWD
    }
}
module.exports = email_config;