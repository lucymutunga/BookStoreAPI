const {createBookSchema} = require('../model/createBookModel');

function createBookValidator(body) {
    const createbook = createBookSchema.validate(body, {abortEarly: false})
    // console.log(book)
    if (createbook.error?.details.length) {
        let message = createbook.error.details.map((err) => err.message);
        // console.log(message.join(" "));
        throw new Error(message.join("\n"));
      } else {
        return createbook;
      }
    }


module.exports = {createBookValidator};