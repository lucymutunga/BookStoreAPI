const express = require("express");
const mssql = require("mssql");
const config = require("../config/config");

async function getAllLoans(req, res) {
  let sql = await mssql.connect(config);
  if (sql.connected) {
    let results = await sql.query("SELECT * FROM library.Books");
    let loans = results.recordset;
    res.json({
      products: loans,
    });
  }
}

//Borrowing Books Method

async function borrowBooks(req, res) {
  let { MemberName, BookTitle } = req.body;

  try {
    let sql = await mssql.connect(config);
    if (sql.connected) {
      let memberCheck = await sql
        .request()
        .input("MemberName", MemberName)
        .query("SELECT * FROM library.Members WHERE Name = @MemberName");

      if (memberCheck.recordset.length === 0) {
        res.json({
          success: false,
          message: "Please register with the library to bollow a book.",
        });
      } else {
        let result = await sql
          .request()
          .input("MemberName", MemberName)
          .input("BookTitle", BookTitle)
          .execute("library.BorrowBooks");

        res.json({
          success: true,
          message: "Successfully borrowed a book.",
          Book: result.recordsets,
        });
      }
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while borrowing the book." });
  }
}

async function returnBooks(req, res) {
  let { MemberName, BookTitle } = req.body;

  try {
    let sql = await mssql.connect(config);
    if (sql.connected) {
      // Check if the person is a member of the library
      let memberCheck = await sql
        .request()
        .input("MemberName", MemberName)
        .query("SELECT * FROM library.Members WHERE Name = @MemberName");

      if (memberCheck.recordset.length === 0) {
        res.json({
          success: false,
          message:
            "Please register with the library to bollow before returning a book.",
        });
      } else {
        // Person is a member, check if they have the specified book
        let bookCheck = await sql
          .request()
          .input("MemberName", MemberName)
          .input("BookTitle", BookTitle)
          .query(
            "SELECT * FROM library.Loans L JOIN library.Books B ON L.BookID = B.BookID JOIN library.Members M ON L.MemberID = M.MemberID WHERE M.Name = @MemberName AND B.Title = @BookTitle"
          );

        if (bookCheck.recordset.length === 0) {
          res.json({
            success: false,
            message: "You don't have the specified book to return.",
          });
        } else {
          let result = await sql
            .request()
            .input("MemberName", MemberName)
            .input("BookTitle", BookTitle)
            .execute("library.ReturnBook");

          res.json({
            success: true,
            message: "Successfully returned the book.",
            Book: result.recordsets,
          });
        }
      }
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while returning the book." });
  }
}

module.exports = { getAllLoans, borrowBooks, returnBooks };
