const express = require('express');
require('dotenv').config();

const app = express();

const membersrouter =require('./src/routes/membersRoutes.js');
//const { user } = require('./src/config/config.js');


app.use (express.json());

app.get('/',(req,res)=>{
   res.send('Ok')
})

app.use ('/members',membersrouter)

const port = process .env.PORT || 3030;


app.listen(port, ()=>console.log(`Server running on port ${port}`))