const express = require("express");
const router = express.Router();
const {
  getAllLoans,
  borrowBooks,
  returnBooks,
} = require("../controllers/loansControllers");

router.get("/loans", getAllLoans);
router.post("/borrow", borrowBooks);
router.post("/return", returnBooks);

module.exports = router;
