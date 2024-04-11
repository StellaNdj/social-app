import React from 'react';
import './Modal.css';
import Button from './Button.tsx';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <Button className={"close-button"} onClick={onClose} text={'Cancel'}></Button>
      </div>
    </div>
  );
};

export default Modal;
