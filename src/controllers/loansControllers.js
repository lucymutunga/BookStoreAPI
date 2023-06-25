const mssql = require("mssql");
const config = require("../config/config");
const cron = require("node-cron");

const {sendMail} = require("../utils/returnsendMail");

const { newBorrowValidator } = require("../validators/borrowBookValidators");
const { newReturnValidator } = require("../validators/returnBookValidation");
const { sendBorrowMail } = require("../utils/borrowMail");
async function getAllLoans(req, res) {
  let sql = await mssql.connect(config);
  if (sql.connected) {
    let results = await sql.query("SELECT * FROM library.Loans");
    let loans = results.recordset;
    res.json({
      success: true,
      message: "Here are the books loaned",
      BooksLoaned: loans,
    });
  }
}

//Borrowing Books Method

async function borrowBooks(req, res) {
  const Email = `lucyalphonce18@gmail.com`;

  let borrow = req.body;
  let { MemberName, BookTitle } = borrow;

  try {
    let { value } = newBorrowValidator(borrow);
    console.log(value);
    let sql = await mssql.connect(config);

    if (sql.connected) {
      let memberCheck = await sql
        .request()
        .input("MemberName", MemberName)
        .query("SELECT * FROM library.Members WHERE Name = @MemberName");

      if (memberCheck.recordset.length === 0) {
        res.json({
          success: false,
          message: "Please register with the library in order to borrow a book.",
        });
      } else {
        let result = await sql
          .request()
          .input("MemberName", MemberName)
          .input("BookTitle", BookTitle)
          .execute("library.BorrowBooks");

        if (
          res.json({
            success: true,
            message: "Successfully borrowed a book.",
            Book: result.recordsets[0],
          })
        ) {
          try {
            await sendBorrowMail(Email, MemberName);
          } catch (err) {
            console.log(err);
          }
        }
      }
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// returnBooks function

async function returnBooks(req, res) {
  let my_return = req.body;
  let { MemberName, BookTitle } = my_return;

  try {
    let { value } = newReturnValidator(my_return);
    console.log(value);
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
           // calling email function
         try{
          await returnsendMail( Email,Name,BookTitle);
         }catch(error){
            console.log(err);
          }
          
          res.json({

            success: true,
            message: "Successfully returned the book.",
            Book: result.recordsets[0],
          });
        }
      }
    }
  } catch (error) {
    // console.error("Error:", error);
    res.status(500).send({ error: error.message });
    // .json({ error: "An error occurred while returning the book." });
  
  }
}

// Cron job to send email notifications for due books
cron.schedule('0 0 * * *', async () => {
  try {
    let sql = await mssql.connect(config);
    if (sql.connected) {
      const currentDate = new Date();
      const dueDate = new Date();
      dueDate.setDate(currentDate.getDate() - 7); // Assuming due date is 7 days from the loan date

      const dueBooks = await sql
        .request()
        .input("DueDate", dueDate)
        .query(
          "SELECT * FROM library.Loans L JOIN library.Books B ON L.BookID = B.BookID JOIN library.Members M ON L.MemberID = M.MemberID WHERE L.ReturnDate IS NULL AND L.LoanDate < @DueDate"
        );

      for (const book of dueBooks.recordset) {
        // Send email notification for each due book
        await sendMail(book.Email, book.Name, book.Title);
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
});







//\list of members who have borrwed a book

async function membersWithBooks(req, res) {
  try {
    let sql = await mssql.connect(config);
    if (sql.connected) {
      let checkLoans = await sql
        .request()
        .query("SELECT COUNT(*) AS LoanCount FROM library.Loans");
      const loanCount = checkLoans.recordset[0].LoanCount;

      if (loanCount > 0) {
        let listOfMembers = await sql
          .request()
          .execute("library.membersWithBooks");
        res.status(200).json({
          success: true,
          message: "The following list of members have books",
          members: listOfMembers.recordsets[0],
        });
      } else {
        res.status(200).json({
          success: true,
          message: "No members currently have our books.",
          members: [],
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getAllLoans, borrowBooks, returnBooks, membersWithBooks };
