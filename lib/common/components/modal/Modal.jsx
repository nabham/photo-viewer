import React from 'react';
import PropTypes from 'prop-types';

import './Modal.css';

/**
 * @description This component handles application popup modal
 * Shows popup modal
 * Zoom-in and out of the image
 */
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

Modal.propTypes = {
  visible: PropTypes.bool,
  image: PropTypes.string,
  onClose: PropTypes.func
};