import React from "react";
import './Navbar.css'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">
        <h1>Home</h1>
      </Link>
    </div>
  )
}

export default Navbar;
