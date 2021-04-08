import React from 'react';
import logo from '../images/header_logo.svg';
import { Link, useHistory, useLocation } from 'react-router-dom';

function Header(props) {

    const history = useHistory();
    let location = useLocation().pathname;


    const handleSignOut = () => {
        localStorage.removeItem('token');
        props.isLoggedIn(false);
        history.push('/sign-in');
    }

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип Mesto"/>
                {props.loggedIn &&  
                    (
                    <div className="header__navbar">
                        <p className="header__navbar-email">{props.email}</p>
                        <Link to="/sign-up" onClick={handleSignOut} className="header__navbar-link">Выйти</Link>
                    </div>
                    )
                }
                {!props.loggedIn &&
                      <div className="header__navbar">
                            {(location === '/sign-in') ?
                                <Link to="/sign-up" className="header__navbar-link">Регистрация</Link> :
                                <Link to="/sign-in" className="header__navbar-link">Войти</Link>
                            }
                        </div>
                    }
        </header> 
    );
  }
  
  export default Header;