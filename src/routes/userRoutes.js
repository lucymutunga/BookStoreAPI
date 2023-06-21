const userRoutes =require('express').Router();
const{postUser}=require('../controllers/userControllers')
userRoutes.post('/',postUser)



module.exports = userRoutes;