 const express = require('express');

 const router = express.Router();
const {getmembers,getMemberById,createMember} = require('../controllers/membercontroller');


  router.get('/members', getmembers);
router.get('/members/:MemberID', getMemberById);
router.post('/members', createMember);

 module.exports = router;
