import React from 'react';
import PropTypes from 'prop-types';

const SuggestionItem = (props) => {
  const { value, select } = props;
  const _select = () => {
    select(value);
  };
  return (
    <div
      onClick={_select}
      onKeyPress={_select}
      className="suggestion-item"
      role="button"
      tabIndex="0"
    >
      {value.name}
    </div>
  );
};

SuggestionItem.propTypes = {
  value: PropTypes.object.isRequired,
  select: PropTypes.func.isRequired,
};

export default SuggestionItem;
