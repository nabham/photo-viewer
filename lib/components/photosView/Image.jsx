import React from 'react';

export const Image = (props) => {

  return (
    <React.Fragment>
      <div className="img-container">
        <div>
          <img className="like-button" src={props.liked ? '/images/liked.png': '/images/unliked.png'} height="50" width="50" onClick={() => props.handleLike(props.id)} />
        </div>
        <img src={props.image} width="300" alt=""/>
      </div>
    </React.Fragment>
  )

};