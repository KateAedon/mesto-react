import React from 'react';
import logo from '../images/header_logo.svg';
import { Link, useHistory } from 'react-router-dom';

function Header(props) {

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип Mesto"/>
            <div className="header__user-container">
            
                <p className="header__user-email">{props.email}</p>
                <button onClick={props.onClick} className="navbar__link navbar__button">Выйти</button>
            </div>
        </header> 
    );
  }
  
  export default Header;