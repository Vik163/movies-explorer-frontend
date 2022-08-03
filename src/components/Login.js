import React from 'react';
import { Link } from 'react-router-dom';

import './Register/Register.css';

import registerLogo from '../images/logo.svg';

function Login(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='register'>
      <Link className='register__logo button-hover' to='/'>
        <img src={registerLogo} alt='Логотип' />
      </Link>

      <h2 className='register__title'>Рады видеть!</h2>

      <form className='register__form' onSubmit={handleSubmit}>
        <label className='register__label'>
          <span className='register__input-title'>E-mail</span>
          <input
            className='register__input register__input_type_email'
            id='email'
            type='email'
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
        <Link className='register__caption-link button-hover' to='/sign-up'>
          Регистрация
        </Link>
      </div>
    </div>
  );
}

export default Login;
