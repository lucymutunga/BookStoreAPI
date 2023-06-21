const joi = require('joi');



const createMemberSchema = joi.object({
    Name: joi.string().required().min(3),
    Address: joi.string().required().min(3).max(30),
    ContactNumber: joi.string().required().min(8).max(8),
    Password: joi.string().required().min(8).max(30),
    //confirm_password: joi.ref('Password')
});

module.exports = { createMemberSchema };