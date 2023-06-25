const { createTransport } = require('nodemailer');
const return_emailconfig = require('../config/return_emailConfig');

require('dotenv').config();

const transporter = createTransport(return_emailconfig);

async function returnsendMail(Email, Name) {

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: Email,
        subject: 'return a book',
        text: `Hello ${Name},We have received the book,thank you`,
    }

try{
    let results = await transporter.returnsendMail(mailOptions);
    console.log(results);
}catch(error){
    console.log(error);
}
}

module.exports = {returnsendMail};
    

       



