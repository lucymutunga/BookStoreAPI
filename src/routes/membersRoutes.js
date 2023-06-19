 const express = require('express');

 const membersrouter = express.Router();
const {getmembers,getMemberById,createMember} = require('../controllers/membercontroller');


membersrouter.get('/', getmembers);
membersrouter.get('/:MemberID', getMemberById);
membersrouter.post('/', createMember);

 module.exports = membersrouter;
