const express = require("express");
const loansrouter = express.Router();
const {
  getAllLoans,
  borrowBooks,
  returnBooks,
  membersWithBooks,
} = require("../controllers/loansControllers");

loansrouter.get("/", getAllLoans);
loansrouter.post("/borrow", borrowBooks);
loansrouter.post("/return", returnBooks);
loansrouter.get("/loans/members", membersWithBooks);

module.exports = loansrouter;
