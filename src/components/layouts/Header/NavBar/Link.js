import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Link = (props) => {
  const { hide, to, label } = props;
  return (
    <>
      {
        !hide
        && (
          <li>
            <NavLink to={to} className="link h5" activeClassName="active-link">
              {label}
            </NavLink>
          </li>
        )
      }
    </>
  );
};

Link.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  hide: PropTypes.bool,
};

Link.defaultProps = {
  hide: false,
};

export default Link;
