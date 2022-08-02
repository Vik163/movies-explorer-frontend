import React from 'react';
import { Link } from 'react-router-dom';

import './Register.css';

import registerLogo from '../../images/logo.svg';

function Register(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='register'>
      <Link className='register__logo button-hover' to='/'>
        <img src={registerLogo} alt='Логотип' />
      </Link>

      <h2 className='register__title'>Добро пожаловать!</h2>

      <form className='register__form' onSubmit={handleSubmit}>
        <label className='register__label'>
          <span className='register__input-title'>Имя</span>
          <input
            className='register__input register__input_type_name'
            id='name'
            type='text'
            name='name'
            required
          />
          <span className='register__input-error name-input-error'>Имя</span>
        </label>
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
        <button className='register__submit button-hover' type='submit'>
          Зарегистрироваться
        </button>
      </form>
      <span className='register__error'>
        {/* {props.errorMessage} */}
        При регистрации пользователя произошла ошибка.
      </span>
      <div className='register__caption'>
        <span>Уже зарегистрированы?</span>
        <Link className='register__caption-link button-hover' to='/sign-in'>
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
