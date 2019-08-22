import React from 'react';
import PropTypes from 'prop-types';

import './Thumbnail.css';

/**
 * @description This component build outer Thumbnail for image, like, expand button container
 * 
 */
export const Thumbnail = (props) => {
  return (
    <div className="thumb-img">
      {props.render(props)}
      <button className="expand-button" onClick={() => props.openModal(props.name)}>
        <img src="/images/expand.png" alt='' width="32" height="32" />
      </button>
    </div>
  )
}

Thumbnail.propTypes = {
  render: PropTypes.func,
  name: PropTypes.string,
  openModal: PropTypes.func
};