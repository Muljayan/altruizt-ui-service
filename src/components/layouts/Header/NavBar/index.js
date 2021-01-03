import React from 'react';
import Link from './Link';

const NavBar = () => (
  <nav className="nav-bar">
    <ul>
      <Link label="Home" to="/" />
      <Link label="Opportunities" to="/opportunities" />
      <Link label="Events" to="/events" />
      <Link label="Organizations" to="/organizations" />
      <Link label="Followings" to="/followings" />
      <Link label="Profile" to="/profile" />
    </ul>
  </nav>
);

export default NavBar;
