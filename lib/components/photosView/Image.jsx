import React, { createRef } from 'react';

export const Image = (props) => {

  const likeRef = createRef();

  function handleLikeClick() {

    // Add animation class
    likeRef.current.classList.toggle('animate-like-button');

    // Remove the animation class after completion
    setTimeout(() => {
      if(likeRef.current) {
        likeRef.current.classList.toggle('animate-like-button');
      }
    }, 1000);

    // Call prop method to handle like
    props.handleLike(props.name);
  }

  return (
    <React.Fragment>
      <div className="img-container">
        <div style={{height: '35px'}}>
          <img className="like-button" src={props.liked ? '/images/liked.png': '/images/unliked.png'} height="30" width="30" onClick={handleLikeClick} ref={likeRef}/>
        </div>
        <img src={props.image}  alt={props.alt} />
      </div>
    </React.Fragment>
  )

};