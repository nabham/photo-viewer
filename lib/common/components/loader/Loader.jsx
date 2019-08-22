import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './Loader.css';

/**
 * @description This component handles application loader
 * Shows loader for specific time interval 
 * Fallback render prop after timeout expire
 */
export default function Loader(props) {

  if (!props.visible) {
    return null;
  }

  let [loaderProp, setLoaderProp] = useState(true);

  useEffect(() => {
    let timeout;
    if (props.timeout) {
      timeout = setTimeout(() => {
        setLoaderProp(false);
      }, props.timeout);
    }

    return ((timeout) => {
      if (timeout) {
        return clearTimeout(timeout);
      }
    })(timeout);
  }, []);

  return (
    <React.Fragment>
      {loaderProp && <div className="loader"></div>}
      {!loaderProp && props.fallback && props.fallback(props)}
    </React.Fragment>
  );
}

Loader.propTypes = {
  visible: PropTypes.bool,
  timeout: PropTypes.number,
  fallback: PropTypes.element
};