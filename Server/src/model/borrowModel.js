const joi = require("joi");

const new_Borrow_Model = joi.object({
  MemberName: joi.string().min(5).required(),
  BookTitle: joi.string().required().min(3),
});

module.exports = { new_Borrow_Model };
