import React from "react";
import Navbar from "../HomePage/Navbar";
import { Link, Outlet } from "react-router-dom";
import "../HomePage/home.css";

const User = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <ul className="nav-links">
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
