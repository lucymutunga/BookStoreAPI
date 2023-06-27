import React from "react";
import GetAllProducts from "./GetAllProducts";
import Navbar from "./Navbar";
import "./home.css";

const Home = () => {
  return (
    <>
      <Navbar />
      <GetAllProducts />
    </>
  );
};

export default Home;
