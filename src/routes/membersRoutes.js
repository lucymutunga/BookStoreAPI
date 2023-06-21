const express = require("express");

const membersrouter = express.Router();
const {
  getmembers,
  getMemberById,
  createMember,
  memberLogin,
} = require("../controllers/membercontroller");
const newMemberMiddleware = require("../Middlewares/newMemberMiddleware");

membersrouter.get("/", getmembers);
membersrouter.get("/:MemberID", getMemberById);
membersrouter.post("/",newMemberMiddleware,createMember);
membersrouter.post("/login", memberLogin);

module.exports = membersrouter;
