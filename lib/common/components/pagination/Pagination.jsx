import React from 'react';

import './Pagination.css';

export default function Pagination(props) {

  function handlePageChange(event, val) {
    event.preventDefault();
    props.onPageChange(val);
  }

  return (
    <div className="pagination">
      <a onClick={(event) => handlePageChange(event, -1)} style={{pointerEvents: props.number === 0 ? 'none' : 'all'}}>&laquo;</a>
      <span>{props.number + 1}</span>
      <a onClick={(event) => handlePageChange(event, 1)}>&raquo;</a>
    </div>
  );
}