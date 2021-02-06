import React from 'react';
import PropTypes from 'prop-types';

const TextArea = (props) => {
  const {
    id,
    value,
    onChange,
    colSize,
    label,
    required,
  } = props;

  const _onChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className={`col-md-${colSize}`}>
      <div className="field mx-1">
        <label htmlFor="">
          <h4>{label}</h4>
        </label>
        <textarea
          value={value}
          onChange={_onChange}
          required={required}
          name={id}
          id={id}
          cols="30"
          rows="10"
        />
      </div>
    </div>
  );
};

TextArea.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  colSize: PropTypes.number,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

TextArea.defaultProps = {
  colSize: 12,
  required: false,
};

export default TextArea;
