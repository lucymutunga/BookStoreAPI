const joi = require("joi");

const new_return_model = joi.object({
  MemberName: joi.string().min(2).required(),
  BookTitle: joi.string().min(3).required(),
});

module.exports = { new_return_model };
