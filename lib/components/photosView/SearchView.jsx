import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * @description This component handle search functionality
 * 
 */
export const SearchView = ({ handleSearch }) => {

  let [searchText, setSearchText] = useState('');

  function searchKeyPress(event) {
    if (event.key === 'Enter' && searchText) {
      handleSearch(searchText);
      return;
    }
  }

  function handleClear() {
    if (searchText) {
      handleSearch('');
    }
    setSearchText('');
  }

  return (
    <div className="search-bar">
      <input type="text" onKeyPress={searchKeyPress} onChange={(event) => setSearchText(event.target.value)} value={searchText} placeholder="Search photos" />
      <button onClick={() => handleSearch(searchText)}>Search</button>
      {searchText && <button onClick={handleClear}>Clear</button>}
    </div>
  );
}

SearchView.propTypes = {
  handleSearch: PropTypes.func
};