import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Link = (props) => {
  const { to, label } = props;
  return (
    <li>
      <NavLink to={to} className="link h5" activeClassName="active-link">
        {label}
      </NavLink>
    </li>
  );
};

Link.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Link;
