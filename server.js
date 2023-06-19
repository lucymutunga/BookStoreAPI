const express = require('express');
require('dotenv').config();

const userRoutes = require('./src/routes/userRoutes.js');
const app = express();

const router =require('./src/routes/membersRoutes.js');
const { user } = require('./src/config/config.js');


app.use (express.json());

app.get('/',(req,res)=>{
   res.send('Ok')
})
app.use(router)
app.use ('/users',userRoutes)
app.use ('/members',router)

const port = process .env.PORT || 3030;


app.listen(port, ()=>console.log(`Server running on port ${port}`))