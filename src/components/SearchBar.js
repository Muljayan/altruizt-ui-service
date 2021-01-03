import React from 'react';

const SearchBar = () => (
  <form className="search-bar">
    <input className="bold" type="text" placeholder="Search..." />
    <button type="submit">
      <img src="/icons/search.svg" alt="search-icon" />
    </button>
  </form>
);

export default SearchBar;
