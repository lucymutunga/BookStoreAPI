const express = require("express");

const booksrouter = express.Router();
const { getAllBooks, getBookById,createBook } = require("../controllers/booksController");
booksrouter.get("/", getAllBooks);
booksrouter.get("/:book_id", getBookById);
booksrouter.post("/add",createBook);
module.exports = booksrouter;
