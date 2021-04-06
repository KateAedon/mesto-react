import React, { useState, Button } from 'react';
import { Link } from "react-router-dom";

function Register({onRegister}) {

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
        onRegister({ email, password });
        
      }

    return (
        <div className="account account-register">
            <h1 className="account__heading">Регистрация</h1>
            <p className="register__error">{message}</p>
            <form className="form account__form" name="register__form" onSubmit={handleSubmit}>
                <input type="text"
                            value={userData.email}
                            onChange={handleChange}
                            id="register__form-email"
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
                            id="register__form-password"
                            autoComplete="off"
                            className="form__input_type_account form__input" 
                            name="password" 
                            placeholder="Пароль" 
                            required/>
                <div className="account__button-container">
                    <button type="submit" className="account__button form__save-button">Зарегистрироваться</button>
                </div>
            </form>
            <div className="account__link_container">
            <Link to="/sign-in" className="account__link">Уже зарегистрированы? Войти</Link>
      </div>
    </div>
    );
  }
  
  export default Register;