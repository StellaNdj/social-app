import React from 'react';
import './Modal.css';
import PostForm from './PostForm.tsx';
import Button from './Button.tsx';

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <PostForm onCloseModal={undefined}></PostForm>
        <Button className={"close-button"} onClick={onClose} text={'Cancel'}></Button>
      </div>
    </div>
  );
};

export default Modal;
