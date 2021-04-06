import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Login({onLogin}) {

    const [userData, setUserData] = useState({
        email: '',
        password: ''
      })

    const [message, setMessage] = useState()
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
          ...userData,
          [name]: value
        });
      }

    const handleSubmit = (e) => {
        let { email, password } = userData;
        e.preventDefault();
        onLogin({ email, password })
      }

    return (
        <div className="account login">
            <h1 className="account__heading">Вход</h1>
            <p className="login__error">{message}</p>
            <form className="form register__form" name="login__form" onSubmit={handleSubmit}>
                <input type="text"
                            value={userData.email}
                            onChange={handleChange}
                            id="login-form-email"
                            autoComplete="off" 
                            minLength="2"
                            maxLength="30"
                            className="form__input_type_account form__input" 
                            name="email" 
                            placeholder="Email" 
                            required/>
                <input type="password"
                            value={userData.password}
                            onChange={handleChange} 
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