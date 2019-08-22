import React, { createRef, useState } from 'react';
import PropTypes from 'prop-types';

import Loader from 'common/components/loader/Loader';

/**
 * @description This component builds a safe wrapper html img handler
 * with attached error and load handlers
 * 
 */
const SafeImage = (props) => {

  let [imgLoaded, setImgLoaded] = useState(false);

  function handleImgLoad() {
    setImgLoaded(true);
    props.onImgLoad();
  }
  function handleImgError(event) {
    event.target.src = '/images/image-not-available.jpg';
    event.target.height = 250;
    event.target.width = 200;
    props.onImgError();
    setImgLoaded(true);
  }

  return (
    <React.Fragment>
      <img src={props.image} alt={props.alt} onError={handleImgError} onLoad={handleImgLoad} />
      <Loader timeout={10000} visible={!imgLoaded} />
    </React.Fragment>
  )
}

/**
 * @description This component contains thumbnail image and like button
 * 
 */
export const Image = (props) => {

  const likeRef = createRef();

  function handleLikeClick() {

    // Add animation class
    likeRef.current.classList.toggle('animate-like-button');

    // Remove the animation class after completion
    setTimeout(() => {
      if (likeRef.current) {
        likeRef.current.classList.toggle('animate-like-button');
      }
    }, 1000);

    // Call prop method to handle like
    props.handleLike(props.name);
  }

  function handleImgError() {
    if (likeRef.current) {
      likeRef.current.style.display = 'none';
    }
  }

  function handleImgLoad() {
    if (likeRef.current) {
      likeRef.current.style.display = 'inline';
    }
  }

  return (
    <div className="img-container">
      <div style={{ height: '35px' }}>
        <img className="like-button" src={props.liked ? '/images/liked.png' : '/images/unliked.png'} height="30" width="30" onClick={handleLikeClick} ref={likeRef} />
      </div>
      <SafeImage {...props} onImgError={handleImgError} onImgLoad={handleImgLoad} />
    </div>
  )
};

Image.propTypes = {
  handleLike: PropTypes.func,
  name: PropTypes.string,
  liked: PropTypes.bool
};

SafeImage.propTypes = {
  onImgLoad: PropTypes.func,
  onImgError: PropTypes.func,
  image: PropTypes.string,
  alt: PropTypes.any
};