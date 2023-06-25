const { new_return_model } = require("../model/returnBookModel");

function newReturnValidator(body) {
  const return_book = new_return_model.validate(body, { abortEarly: false });
  if (return_book.error?.details.length) {
    let returnMessage = return_book.error.details.map((err) => err.message);

    throw new Error(returnMessage.join("\n"));
  } else {
    return return_book;
  }
}

module.exports = { newReturnValidator };
