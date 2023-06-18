const express = require("express");
const router = express.Router();
const {
  getAllLoans,
  borrowBooks,
  returnBooks,
  membersWithBooks,
} = require("../controllers/loansControllers");

router.get("/loans", getAllLoans);
router.post("/borrow", borrowBooks);
router.post("/return", returnBooks);
router.get("/loans/members", membersWithBooks);

module.exports = router;
