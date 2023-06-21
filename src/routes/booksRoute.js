const express = require("express");
const booksrouter = express.Router();
const { getAllBooks, getBookById,createBook } = require("../controllers/booksController");
const tokenValMiddleware = require("../Middlewares/tokenval");
booksrouter.use(tokenValMiddleware);
booksrouter.get("/",getAllBooks);
booksrouter.get("/:book_id", getBookById);
booksrouter.post("/add",createBook);
module.exports = booksrouter;
