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
        console.log({ email, password })
        onRegister({ email, password }).catch(
          err => setMessage(err.message || 'Что-то пошло не так')
        )
      }

    return (
        <div className="register">
            <h1 className="register__heading">Регистрация</h1>
            <p className="register__error">{message}</p>
            <form className="form register-form" name="register__form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="text"
                            value={userData.email}
                            onChange={handleChange}
                            id="register-form-email"
                            autoComplete="off" 
                            minLength="2"
                            maxLength="30"
                            className="form__input_type_register_name form__input" 
                            name="email" 
                            placeholder="Email" 
                            required/>
                <label htmlFor="password">Password</label>
                <input type="password"
                            value={userData.password}
                            onChange={handleChange} 
                            id="register-form-password"
                            autoComplete="off"
                            className="form__input_type_register_password form__input" 
                            name="password" 
                            placeholder="Пароль" 
                            required/>
                <div className="register__button-container">
                    <button type="submit" className="register__button form__save-button">Зарегистрироваться</button>
                </div>
            </form>
            <div className="register__signin">
                <p>Уже зарегистрированы?</p>
            <Link to="login" className="register__login-link">Войти</Link>
      </div>
    </div>
    );
  }
  
  export default Register;