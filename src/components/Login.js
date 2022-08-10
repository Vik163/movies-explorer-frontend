import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

import './Register/Register.css';

import registerLogo from '../images/logo.svg';

function Login(props) {
  const [isName, setIsName] = useState('');
  const [values, setValues] = React.useState({ email: '', password: '' });
  const [errors, setErrors] = React.useState({});
  const [disabled, setDisabled] = React.useState(true);
  const [isInputsValid, setIsInputsValid] = React.useState({
    email: false,
    password: false,
  });

  //Ввод данных и валидация
  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setIsName(name);
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsInputsValid({
      ...isInputsValid,
      [name]: target.closest('input').checkValidity(),
    });
  };

  //Отлючение кнопки submit
  const hasInvalidInputs = () => {
    let arr = [];

    for (let bool in isInputsValid) {
      arr.push(isInputsValid[bool]);
    }
    return arr.some((item) => {
      return item === false;
    });
  };

  useEffect(() => {
    setDisabled(hasInvalidInputs());
  }, [errors]);

  const resetForm = useCallback(() => {
    setValues({ email: '', password: '' });
    setErrors({});
    setIsInputsValid({
      email: false,
      password: false,
    });
    setDisabled(true);
  }, [setValues, setErrors, setIsInputsValid, setDisabled]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleLogin(values);

    resetForm();
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
            onChange={handleChange}
            value={values.email ?? ''}
            placeholder='Email'
            name='email'
            required
          />
          {/* Показать ошибку валидации */}
          {isName === 'email' && (
            <span
              className='register__input-error'
              style={{ display: 'block' }}
            >
              {errors.email}
            </span>
          )}
        </label>
        <label className='register__label'>
          <span className='register__input-title'>Пароль</span>
          <input
            className='register__input register__input_type_password'
            id='password'
            type='password'
            onChange={handleChange}
            value={values.password ?? ''}
            placeholder='Пароль'
            name='password'
            minLength='6'
            required
          />
          {isName === 'password' && (
            <span
              className='register__input-error'
              style={{ display: 'block' }}
            >
              {errors.password}
            </span>
          )}
        </label>
        <button
          className='register__submit register__submit-login button-hover'
          type='submit'
          disabled={disabled}
        >
          Войти
        </button>
      </form>
      <span className='register__error-login'>{props.errorMessage}</span>
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
