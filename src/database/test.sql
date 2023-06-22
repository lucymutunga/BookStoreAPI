CREATE PROCEDURE library.CreateAdmin
  @Name VARCHAR(255),
  @Address VARCHAR(255),
  @ContactNumber VARCHAR(20),
  @Email VARCHAR(255),
  @Password VARCHAR(255)
AS
BEGIN
  INSERT INTO library.Members (Name, Address, ContactNumber, Email, Password, Role)
  VALUES (@Name, @Address, @ContactNumber, @Email, @Password, 'admin');
  
  SELECT SCOPE_IDENTITY() AS MemberID;
END;
EXEC library.CreateAdmin 'John Doe', '123 Main Street', '123-456-7890', 'john.doe@example.com', 'adminpassword';
select * from library.Members

CREATE PROCEDURE library.Createuser
  @Name VARCHAR(255),
  @Address VARCHAR(255),
  @ContactNumber VARCHAR(20),
  @Email VARCHAR(255),
  @Password VARCHAR(255)
AS
BEGIN
  INSERT INTO library.Members (Name, Address, ContactNumber, Email, Password, Role)
  VALUES (@Name, @Address, @ContactNumber, @Email, @Password, 'user');
  
  SELECT SCOPE_IDENTITY() AS MemberID;
END;
EXEC library.CreateUser 'Jane Smith', '456 Elm Street', '987-654-3210', 'jane.smith@example.com', 'userpassword';


