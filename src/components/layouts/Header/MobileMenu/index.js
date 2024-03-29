import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_CURRENT_USER } from 'actions/types';

import Link from './Link';

const getAuthStatus = createSelector(
  (state) => state.auth,
  (auth) => auth,
);

const MobileMenu = () => {
  const history = useHistory();
  const [checked, setchecked] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(getAuthStatus);

  const _logOut = () => {
    dispatch({ type: CLEAR_CURRENT_USER });
    history.push('/login');
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
        <Link hideMenu={_toggleChecked} hide={!isAuthenticated} label="All Events" to="/events" />
        <Link hideMenu={_toggleChecked} hide={!isAuthenticated} label="Events Followed" to="/followings" />
        <Link hideMenu={_toggleChecked} hide={!isAuthenticated} label="Organizations Followed" to="/followed-organization" />
        {
          isAuthenticated
            ? (
              <Link hideMenu={_toggleChecked} label="Dashboard" to="/dashboard" />
            )
            : (
              <Link hideMenu={_toggleChecked} label="Login" to="/login" />
            )
        }
        {
          isAuthenticated
          && (
            <div
              className="logout-btn"
              onClick={_logOut}
              onKeyPress={_logOut}
              role="button"
              tabIndex="0"
            >
              Logout
              <img
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
