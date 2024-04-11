import React from "react";
import Avatar from "./Avatar.tsx";
import './components css/Profile.css';
import Button from "./Button.tsx";
import { useLogout } from "../hooks/useLogout.tsx";
import { useState } from "react";
import PostForm from "./PostForm.tsx";
import Modal from "./Modal.tsx";
import { Link } from "react-router-dom";

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
      <Link to="/">
        <Button className="home-btn" text={'Home'} onClick={undefined}></Button>
      </Link>
      <Button className="post-btn" text={'Create a post'} onClick={toggleModal}></Button>
      <Button className="logout-btn" text={'Log out'} onClick={handleClick}></Button>
      <Modal isOpen={showModal} onClose={toggleModal}>
        <PostForm onCloseModal={toggleModal}></PostForm>
      </Modal>
    </div>
  )
}

export default Profile;
