const express = require("express");

const membersrouter = express.Router();
const {
  getmembers,
  getMemberById,
  createMember,
  memberLogin,
} = require("../controllers/membercontroller");

membersrouter.get("/", getmembers);
membersrouter.get("/:MemberID", getMemberById);
membersrouter.post("/", createMember);
membersrouter.post("/login", memberLogin);

module.exports = membersrouter;
