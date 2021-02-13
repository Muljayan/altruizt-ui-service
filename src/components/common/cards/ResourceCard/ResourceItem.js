import React from 'react';
import PropTypes from 'prop-types';

const ResourceItem = (props) => {
  const {
    label,
    value,
    unit,
  } = props;
  return (
    <div className="col-md-6">
      <div className="row">
        <div className="col-4">
          <b>{label}</b>
        </div>
        <div className="col-8">
          {value}
          {' '}
          {unit}
        </div>
      </div>
    </div>
  );
};

ResourceItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  unit: PropTypes.string,
};

ResourceItem.defaultProps = {
  unit: 'unit',
};

export default ResourceItem;
