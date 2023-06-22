const express = require("express");
const loansrouter = express.Router();
const {
  getAllLoans,
  borrowBooks,
  returnBooks,
  membersWithBooks,
} = require("../controllers/loansControllers");
const tokenval = require("../Middlewares/tokenval");
const adminTokenValidation = require("../Middlewares/adminMemberMiddleware");
loansrouter.get("/", adminTokenValidation, getAllLoans);
loansrouter.post("/borrow", tokenval, adminTokenValidation, borrowBooks);
loansrouter.post("/return", tokenval, adminTokenValidation, returnBooks);
loansrouter.get("/loans/members", adminTokenValidation, membersWithBooks);

module.exports = loansrouter;
