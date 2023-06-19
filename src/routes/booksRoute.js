const express = require("express");

const booksrouter = express.Router();
const { getAllBooks, getBookById,createBook } = require("../controllers/booksController");
router.get("/", getAllBooks);
router.get("/:book_id", getBookById);
router.post("/post",createBook)
module.exports = booksrouter;
