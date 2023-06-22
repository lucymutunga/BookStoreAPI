const express = require("express");

const membersrouter = express.Router();
const {
  getmembers,
  getMemberById,
  createMember,
  memberLogin,
  createAdmin,
} = require("../controllers/membercontroller");
const adminTokenValidation = require("../Middlewares/adminMemberMiddleware");
// const tokenval = require("../Middlewares/adminMemberMiddleware");

membersrouter.get("/", adminTokenValidation, getmembers);
membersrouter.get("/:MemberID", adminTokenValidation, getMemberById);
membersrouter.post("/", createMember);
membersrouter.post("/admin", createAdmin);
membersrouter.post("/login", memberLogin);

module.exports = membersrouter;
