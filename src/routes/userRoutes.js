const { user } = require('../config/config');
const { postUser } = require('../controllers/userControllers');
const userRoutes = require('express').Router();

userRoutes.post('/', postUser);
    


module.exports = userRoutes;