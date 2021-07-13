import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const StatCard = (props) => {
  const {
    value, label, link, linkLabel,
  } = props;
  return (
    <div className="col-md-4 col-6 p-1 stat-card">
      <div className="body container-common p-1 py-2">
        <div className="value h1 t-center">{value}</div>
        <div className="label h3 t-center">{label}</div>
        {
          link
          && (
            <div className="btn-container t-center">
              <Link className="btn btn-primary" to={link}>
                {linkLabel}
              </Link>
            </div>
          )
        }
      </div>
    </div>
  );
};

StatCard.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  label: PropTypes.string,
  link: PropTypes.string,
  linkLabel: PropTypes.string,
};

StatCard.defaultProps = {
  link: null,
  value: '',
  label: '',
  linkLabel: null,
};

export default StatCard;
