import React from "react";
import './Button.css'

const Button = ({text, className, onClick}) => {
  return (
    <button className={`button ${className}`} onClick={onClick}>{text}</button>
  )
};

export default Button;