const express = require("express");
const booksrouter = express.Router();
const {
  getAllBooks,
  getBookById,
  createBook,
} = require("../controllers/booksController");
const adminTokenValidation = require("../Middlewares/adminMemberMiddleware");
const tokenval = require("../Middlewares/tokenval");
booksrouter.get("/", getAllBooks);
booksrouter.get("/:book_id", adminTokenValidation, tokenval, getBookById);
booksrouter.post("/add", adminTokenValidation, createBook);
module.exports = booksrouter;
