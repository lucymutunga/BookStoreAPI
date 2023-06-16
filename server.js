const express = require('express');
require('dotenv').config();

const app = express();

const router =require('./src/routes/membersRoutes.js');


app.use (express.json());

app.get('/',(req,res)=>{
   res.send('Ok')
})
app.use(router)
const port = process .env.PORT || 4040;


app.listen(port, ()=>console.log(`Server running on port ${port}`))