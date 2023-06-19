const express = require("express");
const loansrouter = express.Router();
const {
  getAllLoans,
  borrowBooks,
  returnBooks,
  membersWithBooks,
} = require("../controllers/loansControllers");

router.get("/", getAllLoans);
router.post("/borrow", borrowBooks);
router.post("/return", returnBooks);
router.get("/loans/members", membersWithBooks);

module.exports = loansrouter;
