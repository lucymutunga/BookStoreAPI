const { memberLogin } = require('../controllers/membercontroller');
const {memberLoginSchema} = require('../model/memberLoginModel');

function memberLoginValidator(body) {
    const member = memberLoginSchema.validate(body, {abortEarly: false})
    console.log(member)
    if (member_login.error?.details.length) {
        let message = member_login.error.details.map((err) => err.message);
        // console.log(message.join(" "));
        throw new Error(message.join("\n"));
      } else {
        return borrow;
      }
    }



module.exports = {memberLoginValidator};