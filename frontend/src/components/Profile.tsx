import React from "react";
import PostForm from "./PostForm.tsx";

const Profile = ({firstName, lastName, username}) => {
  return (
    <div>
      <p>{firstName && lastName}</p>
      <p>{username}</p>
      <PostForm></PostForm>
    </div>
  )
}

export default Profile;
