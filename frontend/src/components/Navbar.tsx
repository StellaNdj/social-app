import React from "react";
import './Navbar.css'
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <div className="navbar">
      <img src="https://i.pinimg.com/originals/f9/6a/26/f96a261e5a60d7d66b36e2850e3eb19b.png" alt="Logo" height={50} width={50}></img>
      <Link to="/">
        <h1>Home</h1>
      </Link>
      <div></div>
    </div>
  )
}

export default Navbar;
