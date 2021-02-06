import React from 'react';
import PropTypes from 'prop-types';

const TextArea = (props) => {
  const { colSize, label } = props;
  return (
    <div className={`col-md-${colSize}`}>
      <div className="field mx-1">
        <label htmlFor="">
          <h4>{label}</h4>
        </label>
        <textarea name="" id="" cols="30" rows="10" />
      </div>
    </div>
  );
};

TextArea.propTypes = {
  colSize: PropTypes.number,
  label: PropTypes.string.isRequired,
};

TextArea.defaultProps = {
  colSize: 12,
};

export default TextArea;
