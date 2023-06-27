import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
const Navbar = () => {
  return (
    <>
      <div className=" navBar">
        <p>Welcome to our bookStore. </p>

        <div className="homeitems">
          <img src="../../assets/images/logo.jpg" alt="img" />
          <ul className="homeItems">
            <Link className="link-style" to="/">
              <li>Home</li>
            </Link>
            <Link className="link-style" to="/login">
              <li>Login</li>
            </Link>
            <Link className="link-style" to="/signup">
              <li>Signup</li>
            </Link>
          </ul>

          {/* <ul className="nav-links">
            <Link className="link-style" to="/Home/Books">
              <li>Available Books</li>
            </Link>
            <Link className="link-style" to="/Home/BorrowBooks">
              <li>Borrow Books</li>
            </Link>
            <Link className="link-style" to="/Home/Returnbooks">
              <li>Return Books</li>
            </Link>
            <Link className="link-style" to="/Home/MyBooks">
              <li>MyBooks</li>
            </Link>
          </ul>
        </div> */}
        </div>
      </div>
    </>
  );
};

export default Navbar;
