import React from 'react';
import PropTypes from 'prop-types';

const TableButton = (props) => {
  const {
    onClick, clickParam, conditional, label, label2,
  } = props;
  let finalLabel = label;
  if (label2) {
    if (!conditional) {
      finalLabel = label2;
    }
  }
  return (
    <button
      type="button"
      onClick={() => {
        onClick(clickParam);
      }}
      className={`btn btn-${conditional ? 'primary' : 'red'}`}
    >
      {finalLabel}
    </button>
  );
};

TableButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  clickParam: PropTypes.any.isRequired,
  conditional: PropTypes.bool,
  label: PropTypes.string.isRequired,
  label2: PropTypes.string,
};

export default TableButton;
