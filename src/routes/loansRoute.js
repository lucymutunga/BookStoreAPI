const express = require("express");
const loansrouter = express.Router();
const {
  getAllLoans,
  borrowBooks,
  returnBooks,
  membersWithBooks,
} = require("../controllers/loansControllers");
const sendMail = require("../utils/borrowMail");
const tokenval = require("../Middlewares/tokenval");
const adminTokenValidation = require("../Middlewares/adminMemberMiddleware");

loansrouter.use(tokenval);
loansrouter.post("/borrow", borrowBooks);
loansrouter.post("/return", returnBooks);

loansrouter.get("/", adminTokenValidation, getAllLoans);
loansrouter.get("/loans/members", adminTokenValidation, membersWithBooks);

module.exports = loansrouter;
