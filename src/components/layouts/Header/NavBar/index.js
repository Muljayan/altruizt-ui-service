import React from 'react';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';

import Link from './Link';

const getAuthStatus = createSelector(
  (state) => state.auth,
  (auth) => auth,
);

const NavBar = () => {
  const { isAuthenticated, user } = useSelector(getAuthStatus);
  return (
    <nav className="nav-bar">
      <ul className="main-links">
        <Link label="Home" to="/" />
        <Link label="Opportunities" to="/opportunities" />
        <Link label="Events" to="/events" />
        <Link label="Organizations" to="/organizations" />
        <Link hide={!isAuthenticated} label="Followings" to="/followings" />
      </ul>
      {
        isAuthenticated
          ? (
            <ul>
              <Link label={user.name} to="/profile" />
            </ul>
          )
          : (
            <ul>
              <Link label="Login" to="/login" />
            </ul>
          )
      }
    </nav>
  );
};

export default NavBar;
