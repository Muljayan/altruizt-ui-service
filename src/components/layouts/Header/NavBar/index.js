import React from 'react';
import { createSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CLEAR_CURRENT_USER } from 'actions/types';

import Link from './Link';

const getAuthStatus = createSelector(
  (state) => state.auth,
  (auth) => auth,
);

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuthenticated } = useSelector(getAuthStatus);

  const _logOut = () => {
    dispatch({ type: CLEAR_CURRENT_USER });
    history.push('/login');
  };

  return (
    <nav className="nav-bar hide-mobile">
      <ul className="main-links">
        <Link label="Home" to="/" />
        <Link label="Opportunities" to="/opportunities" />
        <Link label="Organizations" to="/organizations" />
        <Link hide={!isAuthenticated} label="Events" to="/events" />
        <Link hide={!isAuthenticated} label="Followings" to="/followings" />
      </ul>
      {
        isAuthenticated
          ? (
            <ul>
              <Link label="Dashboard" to="/dashboard" />
            </ul>
          )
          : (
            <ul>
              <Link label="Login" to="/login" />
            </ul>
          )
      }
      {
        isAuthenticated
        && (
          <ul
            onClick={_logOut}
            onKeyPress={_logOut}
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
            role="button"
            tabIndex="0"
          >
            <li>
              <img src="/icons/logout.svg" alt="logout" />
            </li>
          </ul>
        )
      }
    </nav>
  );
};

export default NavBar;
