import React from 'react';
import PropTypes from 'prop-types';

const TextField = (props) => {
  const {
    id,
    value,
    placeholder,
    onChange,
    colSize,
    label,
    type,
    required,
    hide,
  } = props;

  const _onChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <>
      {
        !hide
        && (
          <div className={`col-md-${colSize}`}>
            <div className="field mx-1">
              <label htmlFor={id}>
                <h4>
                  {label}
                  {' '}
                  {required ? '*' : ''}
                </h4>
              </label>
              <input
                id={id}
                onChange={_onChange}
                value={value}
                type={type}
                required={required}
                placeholder={placeholder}
              />
            </div>
          </div>
        )
      }
    </>
  );
};

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  colSize: PropTypes.number,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  hide: PropTypes.bool,
};

TextField.defaultProps = {
  colSize: 12,
  type: 'text',
  placeholder: '',
  required: false,
  hide: false,
};

export default TextField;
