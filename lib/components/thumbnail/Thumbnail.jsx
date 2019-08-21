import React from 'react';

import './Thumbnail.css';

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