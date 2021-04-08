import React, { useState } from 'react';
import * as auth from '../utils/auth.js';
import { Link, useHistory } from "react-router-dom";

function Login(props) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const history = useHistory();
    const [message, setMessage] = useState()
    
    function handleEmail(e) {
      setEmail(e.target.value);
    }
  
    function handlePassword(e) {
      setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        auth
            .authorize(email, password)
            .then((data) => {
              if (!data) throw new Error('Неверные имя пользователя или пароль')
              if (data.token) {
              props.isLoggedIn(true)
              history.push('/')
              return;
            }
          })
      }

    return (
        <div className="account login">
            <h1 className="account__heading">Вход</h1>
            <p className="login__error">{message}</p>
            <form className="form register__form" name="login__form" onSubmit={handleSubmit}>
                <input type="text"
                            value={email}
                            onChange={handleEmail}
                            id="login-form-email"
                            autoComplete="off" 
                            minLength="2"
                            maxLength="30"
                            className="form__input_type_account form__input" 
                            name="email" 
                            placeholder="Email" 
                            required/>
                <input type="password"
                            value={password}
                            onChange={handlePassword} 
                            id="login-form-password"
                            autoComplete="off"
                            className="form__input_type_account form__input" 
                            name="password" 
                            placeholder="Пароль" 
                            required/>
                <div className="account__button-container">
                    <button type="submit" className="account__button form__save-button">Войти</button>
                </div>
            </form>
            <div className="account__link_container">
            <Link to="/sign-up" className="account__link login__register-link">Еще не зарегистрированы? Зарегистрироваться</Link>
      </div>
    </div>
    );
  }
  
  export default Login;