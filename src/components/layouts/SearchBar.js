import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = (props) => {
  const { value, onChange, placeholder } = props;

  const _onChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <form className="search-bar">
      <input
        onChange={_onChange}
        value={value}
        placeholder={placeholder}
        className="bold"
        type="text"
      />
      <button type="submit">
        <img src="/icons/search.svg" alt="search-icon" />
      </button>
    </form>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};
SearchBar.defaultProps = {
  placeholder: 'Search...',
};

export default SearchBar;
