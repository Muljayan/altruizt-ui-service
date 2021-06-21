import React from 'react';
import TopBar from './TopBar';
import NavBar from './NavBar';
import MobileMenu from './MobileMenu';
import Disclaimer from './Disclaimer';

const Header = () => (
  <header>
    <Disclaimer />
    <MobileMenu />
    <TopBar />
    <NavBar />
  </header>
);

export default Header;
