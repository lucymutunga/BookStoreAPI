require("dotenv").config();
const email_config = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  outh: {
    user: process.env.EMAIL_USER,
    Pass: process.env.EMAIL_PWD,
  },
};

module.exports = email_config;
