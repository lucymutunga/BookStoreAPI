//  const{tokenVerifier}=require('../utils/tokens')
//  async function tokenValMiddleware(req,res,next){
//     let token = req.headers['authorization'].split(" ")[1]
//     try{
//     if(!token)return next({status:400,message:"Provide a token to proceed"});
//      let member = await tokenVerifier(token)
//      if (member.roles === "admin") {
//         req.member = member
//         next()
//      }
//     }catch(error){
//         next({status:401,message:error.message })
//     }
// }
// module.exports = tokenValMiddleware;

const { tokenVerifier } = require("../utils/tokens");
const config = require("../config/config");
let mssql = require("mssql");
async function tokenValMiddleware(req, res, next) {
  let token = req.headers["authorization"]?.split(" ")[1];
  try {
    if (!token)
      return next({ status: 400, message: "Provide a token to proceed" });

    let member = await tokenVerifier(token);

    let sql = await mssql.connect(config);

    let result = await sql
      .request()
      .input("MemberID", member.MemberID)
      .query("SELECT Role FROM library.Members WHERE MemberID = @MemberID");

    if (result.recordset.length > 0) {
      let role = result.recordset[0].Role;

      if (role === "user" || role === "admin") {
        req.member = member;
        req.member.role = role;
        next();
      } else {
        next({ status: 401, message: "Unauthorized" });
      }
    } else {
      next({ status: 401, message: "Invalid member ID" });
    }
  } catch (error) {
    next({ status: 401, message: error.message });
  }
}

module.exports = tokenValMiddleware;
