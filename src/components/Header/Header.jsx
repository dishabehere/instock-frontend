import React from 'react';
import { NavLink } from "react-router-dom";
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
        <NavLink className={({ isActive }) => 
            isActive ? 'nav-bar__link nav-bar__link--active' : 'nav-bar__link'
          } to="/">
          <h2 className='nav-bar__title'>Warehouse</h2>
        </NavLink>
        <NavLink to="/inventories" className={({ isActive }) => 
            isActive ? 'nav-bar__link nav-bar__link--active' : 'nav-bar__link'
          } >
          <h2 className='nav-bar__title'>Inventory</h2>
        </NavLink>
      </nav>

    </header>
  );
}

export default Header;