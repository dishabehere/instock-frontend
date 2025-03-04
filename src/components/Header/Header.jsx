import React from 'react';
import { Link } from "react-router-dom";
import "./Header.scss";

function Header() {
  return (
    <header className='header__container'>
      <img
        className="header__logo"
        src="../src/assets/logo/InStock-Logo_1x.png"
        alt="header logo of two arrows in opposite directions"
        ></img>
      <nav>
        <Link to="/">
          <h2>Warehouse</h2>
        </Link>
        <Link to="/inventories">
          <h2>Inventory</h2>
        </Link>
      </nav>
    </header>
  );
}

export default Header;