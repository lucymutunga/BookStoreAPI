const {memberLoginSchema} = require('../model/memberLoginModel');

function memberLoginValidator(body) {
    const member = memberLoginSchema.validate(body, {abortEarly: false})
    console.log(member)
    if (borrow.error?.details.length) {
        let message = borrow.error.details.map((err) => err.message);
        // console.log(message.join(" "));
        throw new Error(message.join("\n"));
      } else {
        return borrow;
      }
    }



module.exports = {memberLoginValidator};