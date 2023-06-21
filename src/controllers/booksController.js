const mssql = require("mssql");
const config = require("../config/config");

const { createBookValidator } = require("../validators/createBookValidation");
// fetching all books
async function getAllBooks(req, res) {
  let sql = await mssql.connect(config);
  if (sql.connected) {
    let results = await sql.query(`SELECT * from library.Books`);
    let books = results.recordset;
    res.json({
      success: true,
      message: "Here are the books",
      results: books,
    });
  } else {
    res.status(500).send("internal server error");
  }
}
//fetching a single book
async function getBookById(req, res) {
  let { book_id } = req.params;
  let sql = await mssql.connect(config);
  if (sql.connected) {
    let results = await sql.query(
      `SELECT * from library.Books WHERE BookID = ${Number(book_id)}`
    );

    let book = results.recordset[0];

    res.json({
      success: true,
      message: "Here is the book",
      results: book,
    });
  } else {
    res.status(500).send("internal server error");
  }
}
//creating a book
async function createBook(req, res) {
  try {
    
  
  let { Title, Author, PublicationYear, Status } = req.body;
  console.log(req.body);
  let value = createBookValidator(req.body);
  console.log(value);
  let sql = await mssql.connect(config);
  if (sql.connected) {
    let results = await sql.query(
      `INSERT INTO library.Books ( Title, Author, PublicationYear, Status) VALUES ('${Title}', '${Author}','${PublicationYear}', '${Status}' )`
    );
    res.json({
      success: true,
      message: "Book created successfully",
      results: results,
    });
  } else {
    res.status(500).send("internal server error");
  }
} catch (error) {
    res.send(error.message);
}
}


module.exports = { getAllBooks, getBookById, createBook };
