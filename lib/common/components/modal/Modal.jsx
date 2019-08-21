import React from 'react';

import './Modal.css';

export default function Modal(props) {

  if (!props.visible) {
    return null;
  }

  function handleZoom(event) {
    event.target.classList.toggle('zoom-in');
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <img src={props.image} className="zoom-image" onClick={handleZoom} alt="" />
      </div>
      <button className="close-btn" onClick={props.onClose}>x</button>
    </div>
  );
}