const { memberLoginSchema } = require("../model/memberLoginModel");

function memberLoginValidator(body) {
  const member_login = memberLoginSchema.validate(body, { abortEarly: false });
  // console.log(member);
  if (member_login.error?.details.length) {
    let message = member_login.error.details.map((err) => err.message);
    // console.log(message.join(" "));
    throw new Error(message.join("\n"));
  } else {
    return member_login;
  }
}

module.exports = { memberLoginValidator };
