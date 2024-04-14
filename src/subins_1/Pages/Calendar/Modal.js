import React from 'react';

const Modal = ({ onClose, children }) => {
  return (
    <div className="modal-background" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>X</span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
