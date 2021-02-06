import React from 'react';
import PropTypes from 'prop-types';

const TextField = (props) => {
  const {
    id,
    value,
    onChange,
    colSize,
    label,
    type,
    required,
  } = props;

  const _onChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className={`col-md-${colSize}`}>
      <div className="field mx-1">
        <label htmlFor={id}>
          <h4>{label}</h4>
        </label>
        <input id={id} onChange={_onChange} value={value} type={type} required={required} />
      </div>
    </div>
  );
};

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  colSize: PropTypes.number,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
};

TextField.defaultProps = {
  colSize: 12,
  type: 'text',
  required: false,
};

export default TextField;
