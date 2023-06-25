const express = require("express");
const booksrouter = express.Router();
const multer = require("multer");

const {
  getAllBooks,
  getBookById,
  createBook,
} = require("../controllers/booksController");
const adminTokenValidation = require("../Middlewares/adminMemberMiddleware");
const tokenval = require("../Middlewares/tokenval");
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images/booksImages");
  },
  filename: (req, file, cb) => {
    const extension = file.mimetype.split("/")[1];
    cb(null, `book-${req.body.Title}-${Date.now()}.${extension}`);
  },
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image"), false);
  }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
booksrouter.get("/", tokenval, getAllBooks);
booksrouter.get("/:book_id", tokenval, getBookById);
booksrouter.post(
  "/add",
  upload.single("img"),
  adminTokenValidation,
  createBook
);
module.exports = booksrouter;
