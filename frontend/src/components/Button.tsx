import React from "react";
import './components css/Button.css'

const Button = ({text, className, onClick}) => {
  return (
    <button className={`button ${className}`} onClick={onClick}>{text}</button>
  )
};

export default Button;
