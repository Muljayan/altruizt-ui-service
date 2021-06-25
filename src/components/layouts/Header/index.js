import React from 'react';
import TopBar from './TopBar';
import NavBar from './NavBar';
import MobileMenu from './MobileMenu';

const Header = () => (
  <header>
    <MobileMenu />
    <TopBar />
    <NavBar />
  </header>
);

export default Header;
