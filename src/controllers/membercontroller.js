const mssql = require("mssql");
const config = require("../config/config.js");
const bcrypt = require("bcrypt");
async function getmembers(req, res) {
  let sql = await mssql.connect(config);

  if (sql.connected) {
    let results = await sql.query("Select * from library.Members");
    // console.log(results.recordset);
    let members = results.recordset;
    res.json({
      success: true,
      message: "fetched members successfully",
      results: members,
    });
  } else {
    res.status(500).send("Internal server error");
  }
}
async function getMemberById(req, res) {
  let { MemberID } = req.params;

  let sql = await mssql.connect(config);
  if (sql.connected) {
    let results = await sql.query(
      `SELECT * FROM library.Members WHERE MemberID=${Number(MemberID)}`
    );

    let members = results.recordset[0];
    res.json({
      success: true,
      message: "fetched Member successfully",
      results: members,
    });
  } else {
    res.status(500).send("Internal server error");
  }
}
//creating a member
async function createMember(req, res) {
  let create_member = req.body;
  let { Name, Address, ContactNumber, Password } = create_member;
  let sql = await mssql.connect(config);
  let hashed_password = await bcrypt.hash(Password, 8);
  if (sql.connected) {
    let checkQuery = `SELECT * FROM library.Members WHERE Name = '${Name}'`;
    let checkResult = await sql.query(checkQuery);

    if (checkResult.recordset.length > 0) {
      // User already exists
      res.status(409).json({
        success: false,
        message: "User already exists",
      });
    } else {
      let result = await sql
        .request()
        .input("Name", Name)
        .input("Address", Address)
        .input("ContactNumber", ContactNumber)
        .input("Password", hashed_password)
        .execute("library.CreateMember");
      res.send(result);
      //   json({
      //     success: true,
      //     message: "Member created successfully",
      //     results: result,
      //   });
    }
  } else {
    res.status(500).send("Internal server error");
  }
}

async function memberLogin(req, res) {
  let { MemberID, Password } = req.body;
  try {
    let sql = await mssql.connect(config);
    if (sql.connected) {
      let results = await sql
        .request()
        .input("MemberID", MemberID)
        .execute("library.GetMemberById");
      let member = results.recordset[0];
      if (member) {
        let password_match = await bcrypt.compare(Password, member.Password);
        password_match
          ? res.json({ success: true, message: "Logged in Successfully" })
          : res
              .status(401)
              .json({ success: false, message: "Wrong credentials" });
      } else {
        res.status(401).json({ success: false, Message: "No user found" });
      }
    } else {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  } catch (error) {}
}
//creating a member
// async function createMember(req,res){
//     let {,Name,Address,ContactNumber Password}=req.body;
//     let sql =await mssql.connect(config);
//     if (sql.connected){
//         let results=await sql.query(`INSERT INTO library.Members(MemberID,Name,Address,ContactNumber) VALUES(${MemberID},'${Name}','${Address}','${ContactNumber}')`)
//         res.json({
//             success:true,
//             message:"Member created successfully",
//             results:results
//         })
//     }else{
//         res.status(500).send("Internal server error")
//     }
// }

//Creating a new member

// async function createMember(res, req) {
//   let { Name, Address, ContactNumber, Password } = req.body;
//   try {
//     let sql = await mssql.connect(config);
//     if (sql.connected) {
//       let result = await sql
//         .request()
//         .input("Name", Name)
//         .input("Address", Address)
//         .input("ContactNumber", ContactNumber)
//         .input("Password", Password)
//         .execute("library.CreateMember");

//       res.status(200).json({
//         success: true,
//         message: "Successfully created a member",
//         MemberDetails: result.recordsets,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

module.exports = { getmembers, getMemberById, createMember, memberLogin };
