import React from "react";
import './Avatar.css';

const Avatar = ({firstName, lastName, username}) => {
  return (
    <div className="avatar">
      <img src="https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg" height={50} width={50} alt="avatar-logo"></img>
      <div>
        <h2>{firstName} {lastName}</h2>
        <p>{username}</p>
      </div>
    </div>
  )
};

export default Avatar;
