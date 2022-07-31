import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Register.css';

import registerLogo from '../../images/logo.svg';

function Login(props) {
  const [infoAuth, setInfoAuth] = useState({
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setInfoAuth((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!infoAuth.email || !infoAuth.password) {
      return;
    }
    props.handleLogin(infoAuth);
    setInfoAuth({ email: '', password: '' });
  };

  return (
    <div className='register'>
      <img className='register__logo' src={registerLogo} alt='Логотип' />

      <h2 className='register__title'>Рады видеть!</h2>

      <form className='register__form' onSubmit={handleSubmit}>
        <label className='register__label'>
          <span className='register__input-title'>E-mail</span>
          <input
            className='register__input register__input_type_email'
            id='email'
            type='email'
            onChange={handleChange}
            value={infoAuth.email ?? ''}
            placeholder='Email'
            name='email'
            required
          />
          <span className='register__input-error name-input-error'>E-mail</span>
        </label>
        <label className='register__label'>
          <span className='register__input-title'>Пароль</span>
          <input
            className='register__input register__input_type_password'
            id='password'
            type='password'
            onChange={handleChange}
            value={infoAuth.password ?? ''}
            placeholder='Пароль'
            name='password'
            required
          />
          <span className='register__input-error name-input-error'>Пароль</span>
        </label>
        <button
          className='register__submit register__submit-login button-hover'
          type='submit'
        >
          Войти
        </button>
      </form>
      <span className='register__error'>
        {/* {props.errorMessage} */}
        При авторизации произошла ошибка. Токен не передан или передан не в том
        формате.
      </span>
      <div className='register__caption'>
        <span>Ещё не зарегистрированы?</span>
        <Link className='register__caption-link button-hover' to='/sign-in'>
          Регистрация
        </Link>
      </div>
    </div>
  );
}

export default Login;
