import React, { useState } from 'react';
import { createSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_CURRENT_USER } from 'actions/types';

import Link from './Link';

const getAuthStatus = createSelector(
  (state) => state.auth,
  (auth) => auth,
);

const MobileMenu = () => {
  const [checked, setchecked] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(getAuthStatus);

  const _logOut = () => {
    dispatch({ type: CLEAR_CURRENT_USER });
  };

  const _toggleChecked = () => {
    setchecked(!checked);
  };

  return (
    <div className="mobile-menu">
      <input onChange={_toggleChecked} checked={checked} type="checkbox" id="navcheck" role="button" title="menu" />
      <label htmlFor="navcheck" aria-hidden="true" title="menu">
        <span className="burger">
          <span className="bar">
            <span className="visuallyhidden">Menu</span>
          </span>
        </span>
      </label>
      <nav id="menu">
        <Link hideMenu={_toggleChecked} label="Home" to="/" />
        <Link hideMenu={_toggleChecked} label="Opportunities" to="/opportunities" />
        <Link hideMenu={_toggleChecked} label="Organizations" to="/organizations" />
        <Link hideMenu={_toggleChecked} hide={!isAuthenticated} label="Events" to="/events" />
        <Link hideMenu={_toggleChecked} hide={!isAuthenticated} label="Followings" to="/followings" />
        {
          isAuthenticated
            ? (
              <Link hideMenu={_toggleChecked} label={user.name} to="/profile" />
            )
            : (
              <Link hideMenu={_toggleChecked} label="Login" to="/login" />
            )
        }
        {
          isAuthenticated
          && (
            <div className="logout-btn">
              Logout
              <img
                onClick={_logOut}
                onKeyPress={_logOut}
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                role="button"
                tabIndex="0"
                src="/icons/logout.svg"
                alt="logout"
              />
            </div>
          )
        }
      </nav>
    </div>
  );
};

export default MobileMenu;
