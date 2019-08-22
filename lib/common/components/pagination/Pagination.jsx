import React from 'react';
import PropTypes from 'prop-types';

import './Pagination.css';

/**
 * @description This component handles application pagination
 * Helps move previous and next page
 * 
 */
export default function Pagination(props) {

  if (!props.visible) {
    return null;
  }

  function handlePageChange(event, val) {
    event.preventDefault();
    props.onPageChange(val);
  }

  return (
    <div className="pagination">
      <a onClick={(event) => handlePageChange(event, -1)} style={{ pointerEvents: props.number === 1 ? 'none' : 'all' }}>&laquo;</a>
      <span>{props.number}</span>
      <a onClick={(event) => handlePageChange(event, 1)}>&raquo;</a>
    </div>
  );
}

Pagination.propTypes = {
  visible: PropTypes.bool,
  number: PropTypes.number,
  onPageChange: PropTypes.func
};