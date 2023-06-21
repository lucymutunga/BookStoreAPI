const mssql = require("mssql");
const config = require("../config/config.js");
const { createMemberValidator } = require("../validators/createMemberValidation");
const { memberLoginValidator } = require("../validators/memberLoginValidator");

const bcrypt = require("bcrypt");
const getAMember = require("../utils/getAMember.js");
const { tokenGenerator } = require("../utils/tokens.js");
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
  try {
    
  
  let create_member = req.body;
    let value  = createMemberValidator(create_member);
    console.log(value)
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
} catch (error) {
    res.send(error.message)
    console.log(error.message)
}
}

async function memberLogin(req, res) {
  let { MemberID, Password } = req.body;
  let value  = memberLoginValidator(req.body);
    console.log(value)
  try {
    let member = await getAMember(MemberID);
    if (member) {
      let password_match = await bcrypt.compare(Password, member.Password);
      if (password_match) {
        let token = await tokenGenerator({
          MemberID: member.MemberID,
          roles: "admin",
        });
        console.log(token);
        res.json({ success: true, message: "Logged in Successfully", token });
      } else {
        res.status(401).json({ success: false, message: "Wrong credentials: Please recheck your details and try again" });
      }
    } else {
      res.status(401).json({ success: false, Message: "No user found: Create an account first" });
    }
  } catch (error) {
    console.log(error)
  }
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
