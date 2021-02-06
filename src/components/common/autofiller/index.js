import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SuggestionItem from './SuggestionItem';
import API from '../../../utils/API';

const Searcher = (props) => {
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(false);
  const {
    id,
    searchText,
    setSearchText,
    colSize,
    label,
    type,
    required,
    onSuggestionSelect,
  } = props;

  const select = (value) => {
    if (onSuggestionSelect) {
      onSuggestionSelect(true, value);
    }
    setSearchText(value.name);
    setSelected(true);
  };

  const _onChange = (e) => {
    onSuggestionSelect(false);
    setSelected(false);
    setSearchText(e.target.value);
  };

  const _fetchData = async () => {
    try {
      const res = await API.post('/autocomplete/resources', { text: searchText });
      setSuggestions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    _fetchData();
  }, [searchText]);
  console.log({ searchText, selected });
  if (!selected) {
    console.log('if');
  } else {
    console.log('else');
  }

  const suggestionsList = suggestions.map((suggestion) => (
    <SuggestionItem
      key={suggestion.id}
      value={suggestion}
      select={select}
    />
  ));
  return (
    <div className={`col-md-${colSize}`}>
      <div className="field searcher mx-1">
        <label htmlFor={id}>
          <h4>{label}</h4>
        </label>
        <input
          onChange={_onChange}
          value={searchText}
          id={id}
          type={type}
          required={required}
        />
      </div>
      <div className="suggestions mx-1">
        {
          (!selected && searchText)
          && suggestionsList
        }
      </div>
    </div>
  );
};

Searcher.propTypes = {
  searchText: PropTypes.string.isRequired,
  setSearchText: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  colSize: PropTypes.number,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  onSuggestionSelect: PropTypes.func,
  required: PropTypes.bool,
};

Searcher.defaultProps = {
  colSize: 12,
  type: 'text',
  required: false,
  onSuggestionSelect: null,
};

export default Searcher;
