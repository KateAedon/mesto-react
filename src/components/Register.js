import React, { useState, Button } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as auth from '../utils/auth.js';

function Register(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

    const [message, setMessage] = useState()

    const handleSubmit = (e) => {
        e.preventDefault();
        auth
        .register(email, password)
        .then(
          (res) => {
            props.onSuccess();
            history.push('/sign-in');
        },
        (err) => {
          console.log(err);
          props.onFail();
        })
  }

    return (
        <div className="account account-register">
            <h1 className="account__heading">Регистрация</h1>
            <p className="register__error">{message}</p>
            <form className="form account__form" name="register__form" onSubmit={handleSubmit}>
                <input type="text"
                            value={email}
                            onChange={handleEmail}
                            id="register-form-email"
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
                            id="register-form-password"
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