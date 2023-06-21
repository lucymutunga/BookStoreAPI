const mssql=require('mssql')
const config =require('../config/config')
async function getAMember(MemberID){
  
let sql = await mssql.connect(config);
    if (sql.connected) {
      let results = await sql
        .request()
        .input("MemberID", MemberID)
        .execute("library.GetMemberById");
      let member = results.recordset[0];
      return member;
          }
      }
      module.exports=getAMember;