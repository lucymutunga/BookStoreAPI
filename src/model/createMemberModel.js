const joi = require("joi");

const createMemberSchema = joi
  .object({
    Name: joi.string().required().min(3),
    Address: joi.string().required().min(3).max(30),
    ContactNumber: joi.string().required().min(10).max(15),
    Email: joi.string().min(6).required().max(30),
    Password: joi.string().required().min(8).max(30),
    Confirm_password: joi.ref("Password"),
  })
  .with("Password", "Confirm_password");

module.exports = { createMemberSchema };
