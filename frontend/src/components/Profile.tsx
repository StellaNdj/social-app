import React from "react";
import PostForm from "./PostForm.tsx";
import Avatar from "./Avatar.tsx";
import './Profile.css';
import Button from "./Button.tsx";
import { useLogout } from "../hooks/useLogout.tsx";
import { useState } from "react";
import Modal from "./Modal.tsx";

const Profile = ({firstName, lastName, username}) => {
  const {logout} = useLogout();
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    logout()
  }

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="profile">
      <Avatar firstName={firstName} lastName={lastName} username={username}></Avatar>
      <Button className="home-btn" text={'Home'} onClick={undefined}></Button>
      <Button className="post-btn" text={'Create a post'} onClick={toggleModal}></Button>
      <Button className="logout-btn" text={'Log out'} onClick={handleClick}></Button>
      <Modal isOpen={showModal} onClose={toggleModal}></Modal>
    </div>
  )
}

export default Profile;
