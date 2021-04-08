import React from 'react';
import logo from '../images/header_logo.svg';
import { Link, useHistory } from 'react-router-dom';

function Header(props) {

    const history = useHistory();

    const handleSignOut = () => {
        localStorage.removeItem('token');
        props.isLoggedIn(false);
        history.push('/sign-in');
    }

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип Mesto"/>
                {props.loggedIn ?  
                    <div className="header__navbar">
                        <p className="header__navbar-email">{props.email}</p>
                        <Link to="/sign-up" onClick={handleSignOut} className="header__navbar-link">Выйти</Link>
                    </div> :
                    <div className="header__navbar">
                        <Link to="/sign-in" className="header__navbar-link">Регистрация</Link>
                    </div>}
        </header> 
    );
  }
  
  export default Header;