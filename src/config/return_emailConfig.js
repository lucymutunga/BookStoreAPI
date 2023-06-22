require('dotenv').config();

const return_emailconfig = {
host: 'smtp.gmail.com',

port: 587,

secure: false,

requireTLS: true,

auth: {

user: process.env.EMAIL_USER,
password: process.env.EMAIL_PWD
}
};

module.exports = return_emailconfig;
