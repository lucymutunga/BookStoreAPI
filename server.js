const express = require('express');
const app = express();


app.use (express.json());

app.get('/',(req,res)=>{
    res.send('Hello World')
})

const port = 3000;

app.listen(port, ()=>console.log(`Server running on port ${port}`))