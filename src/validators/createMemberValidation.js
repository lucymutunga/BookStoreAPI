const { createMemberSchema} = require("../model/createMemberModel");


function createMemberValidator(body,) {
    const createMember=createMemberSchema.validate(body, {abortEarly: false}) 
    // console.log(Membermember)
    if (createMember.error?.details.length) {
        let message = createMember.error.details.map((err) => err.message);
        // console.log(message.join(" "));
        throw new Error(message.join("\n"));
      } else {
        return createMember;
      }
    }


module.exports = { createMemberValidator };