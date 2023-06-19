const config = require('../config/config');
const mssql = require('mssql');
const bcrypt = require('bcrypt');

module.exports = {
    postUser : async (req, res) => {
    let user = req.body;
//let salt = await bcrypt.genSalt(8);
//let hashedPassword = await bcrypt.hash(user.password, salt);

let hashed_pwd = await bcrypt.hash(user.password, 8);

let sql = await mssql.connect(config);
if (sql.connected) {
    let results = sql.request()
                         .input("FullName",user.FullName)
                          .input("Address",user.Address)
                          .input("ContactNumber",user.ContactNumber)
                          .input("password",hashed_pwd) 
                          .execute("dbo.createmember");
             
                          console.log(results);
                          res.send(results);
}
    
res.send(hashed_pwd);
//user.password;


    }
}
