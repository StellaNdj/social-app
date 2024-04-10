import React from "react";
import './Navbar.css'
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout.tsx";


const Navbar = () => {
  const {logout} = useLogout();

  const handleClick = () => {
    logout()
  }

  return (
    <div className="navbar">
      <Link to="/">
        <h1>Home</h1>
      </Link>
      <nav>
        <div>
          <button onClick={handleClick}>Log out</button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;
