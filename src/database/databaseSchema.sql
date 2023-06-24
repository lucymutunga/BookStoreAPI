CREATE SCHEMA library;
GO 
CREATE TABLE library.Books (
BookID INT IDENTITY(1,1)PRIMARY KEY, 
Title VARCHAR (255) NOT NULL, 
Author VARCHAR(255) NOT NULL,
PublicationYear VARCHAR(255) NOT NULL,
Status VARCHAR(255) NOT NULL);

--CREATE TABLE library.Members(
--MemberID INT IDENTITY(1,1) PRIMARY KEY,
--Name VARCHAR(255) NOT NULL,
--Address VARCHAR (255) NOT NULL,
--ContactNumber VARCHAR (20) NOT NULL,
--Password VARCHAR(250) NOT NULL
--);

select * from library.Members

CREATE TABLE library.Members (
  MemberID INT IDENTITY(1,1) PRIMARY KEY,
  Name VARCHAR(255) NOT NULL,
  Address VARCHAR(255) NOT NULL,
  ContactNumber VARCHAR(20) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Password VARCHAR(255) NOT NULL,
  Role VARCHAR(20) NOT NULL
);


 
CREATE TABLE library.Loans(
LoanID INT IDENTITY(1,1) PRIMARY KEY,
BookID INT FOREIGN KEY REFERENCES library.Books (BookID),
MemberID INT FOREIGN KEY REFERENCES library.members(MemberID),
LoanDate DATE,
ReturnDate DATE 
);



INSERT INTO library.Books ( Title, Author, PublicationYear, Status) VALUES
( 'To Kill a Mockingbird', 'Harper Lee', '1960', 'Available'),
( '1984', 'George Orwell', '1949', 'Available'),
( 'The Great Gatsby', 'F. Scott Fitzgerald', '1925', 'Available'),
( 'Pride and Prejudice', 'Jane Austen', '1813', 'Available'),
( 'The Catcher in the Rye', 'J.D. Salinger', '1951', 'Available'),
( 'The Hobbit', 'J.R.R. Tolkien', '1937', 'Available'),
('To the Lighthouse', 'Virginia Woolf', '1927', 'Available'),
( 'Brave New World', 'Aldous Huxley', '1932', 'Available'),
( 'Moby-Dick', 'Herman Melville', '1851', 'Available'),
( 'The Lord of the Rings', 'J.R.R. Tolkien', '1954', 'Available'),
('The Alchemist', 'Paulo Coelho', '1988', 'Available'),
( 'To Kill a Mockingbird', 'Harper Lee', '1960', 'Available'),
( 'The Chronicles of Narnia', 'C.S. Lewis', '1950-1956', 'Available'),
( 'The Da Vinci Code', 'Dan Brown', '2003', 'Available'),
( 'Harry Potter and the Sorcerers Stone', 'J.K. Rowling', '1997', 'Available'),
( 'The Hunger Games', 'Suzanne Collins', '2008', 'Available'),
( 'The Lord of the Flies', 'William Golding', '1954', 'Available'),
( 'The Giver', 'Lois Lowry', '1993', 'Available'),
( 'The Kite Runner', 'Khaled Hosseini', '2003', 'Available'),
( 'The Catcher in the Rye', 'J.D. Salinger', '1951', 'Available')
