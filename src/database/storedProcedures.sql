CREATE PROCEDURE library.BorrowBooks
  @MemberName VARCHAR(255),
  @BookTitle VARCHAR(255)
AS
BEGIN
  -- Find the member ID based on the provided name
  DECLARE @MemberID INT;
  SELECT @MemberID = MemberID
  FROM Library.Members
  WHERE Name = @MemberName;

  -- Find the book ID based on the provided title
  DECLARE @BookID INT;
  SELECT @BookID = BookID
  FROM Library.Books
  WHERE Title = @BookTitle;

  -- Check if the book is available
  IF EXISTS (
    SELECT 1
    FROM Library.Books
    WHERE BookID = @BookID AND Status = 'available'
  )
  BEGIN
    -- Get the loan date and calculate the return date
    DECLARE @LoanDate DATE = GETDATE();
    DECLARE @ReturnDate DATE = DATEADD(DAY, 10, @LoanDate);

    -- Update the book status to 'loaned' in the Books table
    UPDATE Library.Books
    SET Status = 'loaned'
    WHERE BookID = @BookID;

    -- Insert a new loan record into the Loans table
    INSERT INTO Library.Loans (BookID, MemberID, LoanDate, ReturnDate)
    VALUES (@BookID, @MemberID, @LoanDate, @ReturnDate);

    -- Return the borrowed book details for the specific member
    SELECT B.*, M.Name AS MemberName, BookID
    FROM Library.Books AS B
    JOIN Library.Members AS M ON M.MemberID = @MemberID
    WHERE B.BookID = @BookID;
  END
  ELSE
  BEGIN
    -- Throw an error if the book is not available
    RAISERROR ('The requested book is not available for borrowing.', 16, 1);
  END
END;



select * from 

EXEC library.BorrowBooks @MemberName='John Smith'
  @BookTitle=''
DROP PROCEDURE library
select * from library.Loans
select  * from library.Members
select * from library.Books


-- Stored procedure to return books 

CREATE PROCEDURE library.ReturnBook
  @MemberName VARCHAR(255),
  @BookTitle VARCHAR(255)
AS
BEGIN
  -- Find the member ID based on the provided name
  DECLARE @MemberID INT;
  SELECT @MemberID = MemberID
  FROM Library.Members
  WHERE Name = @MemberName;

  -- Find the book ID based on the provided title
  DECLARE @BookID INT;
  SELECT @BookID = BookID
  FROM Library.Books
  WHERE Title = @BookTitle;

  -- Update the book status to 'available' in the Books table
  UPDATE Library.Books
  SET Status = 'available'
  WHERE BookID = @BookID;

  -- Delete the book entry from the Loans table
  DELETE FROM Library.Loans
  WHERE BookID = @BookID AND MemberID = @MemberID;
  
  -- Return the details of the returned book
  SELECT B.BookID, B.Title, B.Author, B.PublicationYear, B.Status
  FROM Library.Books AS B
  WHERE B.BookID = @BookID;
END;
EXEC library.ReturnBook @MemberName = 'John Smith', @BookTitle = 'The Great Gatsby';


-- Listing all members who have borrowed books

CREATE OR ALTER PROCEDURE library.MembersWithBooks
AS
BEGIN
    SELECT M.MemberID, M.Name, B.Title
    FROM library.Members M
    INNER JOIN library.Loans L ON M.MemberID = L.MemberID
    INNER JOIN library.Books B ON L.BookID = B.BookID
    ORDER BY M.MemberID;
END;

Exec library.MembersWithBooks



CREATE PROCEDURE library.CreateMember
  @Name VARCHAR(255),
  @Address VARCHAR(255),
  @ContactNumber VARCHAR(20),
  @Password VARCHAR(255)
AS
BEGIN
  IF @Password IS NULL
  BEGIN
    RAISERROR('Password is needed. Please provide a password.', 16, 1);
    RETURN;
  END

  -- Insert the new member
  INSERT INTO library.Members (Name, Address, ContactNumber, Password)
  VALUES (@Name, @Address, @ContactNumber, @Password);

  PRINT 'Successfully registered';
END;

EXEC library.CreateMember
  @Name = 'John Smith',
  @Address = '123 Main St',
  @ContactNumber = '555-1234',
  @Password = 'mypassword';


  
  -- Get a member by id procedure
  
  CREATE PROCEDURE library.GetMemberById
    @MemberId INT
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT *
    FROM library.Members
    WHERE MemberID = @MemberId;
END;