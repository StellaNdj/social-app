import React from "react";
import PostForm from "./PostForm.tsx";
import Avatar from "./Avatar.tsx";

const Profile = ({firstName, lastName, username}) => {
  return (
    <div>
      <Avatar firstName={firstName} lastName={lastName} username={username}></Avatar>
      <PostForm></PostForm>
    </div>
  )
}

export default Profile;
