const { new_Borrow_Model } = require("../model/borrowModel");

function newBorrowValidator(body) {
  const borrow = new_Borrow_Model.validate(body, { abortEarly: false });
  if (borrow.error?.details.length) {
    let message = borrow.error.details.map((err) => err.message);
    // console.log(message.join(" "));
    throw new Error(message.join("\n"));
  } else {
    return borrow;
  }
}

module.exports = { newBorrowValidator };
