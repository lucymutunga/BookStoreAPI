const { createTransport } = require("nodemailer");
require("dotenv").config();

const email_config = require("../config/emailConfig");

const trastporter = createTransport(email_config);
async function sendBorrowMail(Email, Name) {
  const message_options = {
    to: Email,
    from: process.env.EMAIL_USER,
    subject: `Successfully returned our book`,
    text: `Hey${Name}You have returned the book`,
  };
  try {
    let result = trastporter.sendMail(message_options);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { sendBorrowMail };
