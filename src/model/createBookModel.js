const joi = require('joi');

// CREATE BOOK SCHEMA
const createBookSchema = joi.object({
    Title: joi.string().required().min(3),
    Author : joi.string().required().min(3),
    PublicationYear : joi.string().required().min(3),
    Status : joi.string().required().min(3),

});

module.exports = { createBookSchema };

