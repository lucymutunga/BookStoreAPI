const express = require("express");

const router = express.Router();
const { getAllBooks, getBookById,createBook } = require("../controllers/booksController");
router.get("/books", getAllBooks);
router.get("/books/:book_id", getBookById);
router.post("/post",createBook)
module.exports = router;
