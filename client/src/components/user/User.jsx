import React from "react";

import { Link, Outlet } from "react-router-dom";
import "../HomePage/home.css";

const User = () => {
  return (
    <div className="navBar">
      <p>Welcome to our bookStore</p>
      <div className="useritems">
        <img src="../../assets/images/logo.jpg" alt="img" />
        <ul className="homeItems">
          <Link className="link-style" to="/user/borrowbooks">
            <li>Borrow Books</li>
          </Link>
          <Link className="link-style" to="/user/returnbooks">
            <li>Return Books</li>
          </Link>
          <Link className="link-style" to="/user/mybooks">
            <li>MyBooks</li>
          </Link>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default User;
