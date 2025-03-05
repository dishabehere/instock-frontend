import React from 'react';
import { Link } from "react-router-dom";
import "./Header.scss";

function Header() {
  return (
    <header className='header__container'>
      <img
        className="header__logo"
        src="../src/assets/logo/InStock-Logo.svg"
        alt="header logo of two arrows in opposite directions"
        ></img>
      <nav className='nav-bar__container'>
        <Link className='nav-bar__link' to="/">
          <h2 className='nav-bar__title'>Warehouse</h2>
        </Link>
        <Link className='nav-bar__link' to="/inventories">
          <h2 className='nav-bar__title'>Inventory</h2>
        </Link>
      </nav>
    </header>
  );
}

export default Header;