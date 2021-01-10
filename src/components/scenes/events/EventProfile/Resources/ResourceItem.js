import React from 'react';
import PropTypes from 'prop-types';

const ResourceItem = (props) => {
  const {
    label,
    value,
    units,
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
          {units}
        </div>
      </div>
    </div>
  );
};

ResourceItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  units: PropTypes.string,
};

ResourceItem.defaultProps = {
  units: 'units',
};

export default ResourceItem;
