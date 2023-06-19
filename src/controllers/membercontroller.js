const mssql = require('mssql');
const config = require('../config/config.js');

async function getmembers(req, res) {
let sql = await mssql.connect(config);

   
    if (sql.connected) {
        let results = await sql.query('Select * from library.Members');
        // console.log(results.recordset);
        let members =results.recordset;
        res.json({
            success:true,
            message:"fetched members successfully",
            results:members
        })
    }else{
            res.status(500).send("Internal server error")
        }
    
    
}
async function getMemberById(req,res){

    let { MemberID}= req.params;

let sql =await mssql.connect(config) ;
if (sql.connected){
    let results=await sql.query(`SELECT * FROM library.Members WHERE MemberID=${Number(MemberID)}`)

    let members=results.recordset[0]
    res.json({
        success: true,
        message: 'fetched product successfully',
        results:members,

    })
}else{
    res.status(500).send("Internal server error")
}

}






//creating a member
async function createMember(req,res){
    let {MemberID,Name,Address,ContactNumber}=req.body;
    let sql =await mssql.connect(config);
    if (sql.connected){
        let results=await sql.query(`INSERT INTO library.Members(MemberID,Name,Address,ContactNumber) VALUES(${MemberID},'${Name}','${Address}','${ContactNumber}')`)
        res.json({
            success:true,
            message:"Member created successfully",
            results:results
        })
    }else{
        res.status(500).send("Internal server error")
    }
}



module.exports = { getmembers, getMemberById ,createMember};