import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Link = (props) => {
  const {
    hide, hideMenu, to, label,
  } = props;
  return (
    <>
      {
        !hide
        && (
          <NavLink onClick={hideMenu} to={to} className="link h5" activeClassName="active-link">
            {label}
          </NavLink>
        )
      }
    </>
  );
};

Link.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  hide: PropTypes.bool,
  hideMenu: PropTypes.func,
};

Link.defaultProps = {
  hide: false,
  hideMenu: null,
};

export default Link;
