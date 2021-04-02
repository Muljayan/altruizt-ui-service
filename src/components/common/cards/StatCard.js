import React from 'react';
import PropTypes from 'prop-types';

const StatCard = (props) => {
  const { value, label } = props;
  return (
    <div className="col-md-4 col-6 p-1 stat-card">
      <div className="body container-common p-1 py-2">
        <div className="value h1 t-center">{value}</div>
        <div className="label h3 t-center">{label}</div>
      </div>
    </div>
  );
};

StatCard.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  label: PropTypes.string.isRequired,
};

export default StatCard;
