import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
const Navbar = () => {
  return (
    <>
      <div className=" navBar">
        <p>Welcome to our bookStore. </p>

        <div className="nav-items">
          <img src="../../assets/images/logo.jpg" alt="img" />
          <ul className="homeItems"></ul>
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
