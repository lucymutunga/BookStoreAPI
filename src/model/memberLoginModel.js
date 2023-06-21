// create a member Login schema

const joi = require('joi');

const memberLoginSchema = joi.object({
    MemberID: joi.number().required(),
    Password: joi.string().required().min(3),
});

module.exports = { memberLoginSchema };