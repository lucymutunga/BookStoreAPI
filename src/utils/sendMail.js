const {createTransport} = require("nodemailer");
require("dotenv").config();
const email_config=require("../config/emailConfig")

const transporter =createTransport(email_config);

async function sendMail(Email,Name){
    const message_options = {
        to:Email,
        from:process.env.EMAIL_USER,
        subject:"Welcome mail  from Triggers",
        text:`Hello ${Name},Welcome  to BookStore ! grab yourself a book`
        };
    
    try{
let results=await transporter.sendMail(message_options);
console.log(results);
    }catch(error){
console.log(error);
    }
}
module.exports = {sendMail};