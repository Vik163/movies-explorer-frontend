import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

import './Register.css';

import registerLogo from '../../images/logo.svg';

function Register(props) {
  const [isName, setIsName] = useState('');
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [formInValid, setFormInValid] = React.useState(true);
  const [isInputsValid, setIsInputsValid] = React.useState({
    name: false,
    email: false,
    password: false,
  });

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
    setFormInValid(hasInvalidInputs());
  }, [errors]);

  const resetForm = useCallback(() => {
    setValues({});
    setErrors({});
    setIsInputsValid({
      name: false,
      email: false,
      password: false,
    });
    setFormInValid(true);
  }, [setValues, setErrors, setIsInputsValid, setFormInValid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    resetForm();
  };

  return (
    <div className='register'>
      <Link className='register__logo button-hover' to='/'>
        <img src={registerLogo} alt='Логотип' />
      </Link>

      <h2 className='register__title'>Добро пожаловать!</h2>

      <form className='register__form' onSubmit={handleSubmit} noValidate>
        <label className='register__label'>
          <span className='register__input-title'>Имя</span>
          <input
            className='register__input register__input_type_name'
            id='name'
            type='text'
            onChange={handleChange}
            value={values.name ?? ''}
            placeholder='Имя'
            name='name'
            minLength='2'
            maxLength='30'
            required
          />
          {isName === 'name' && (
            <span
              className='register__input-error'
              style={{ display: 'block' }}
            >
              {errors.name}
            </span>
          )}
        </label>
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
            minLength='4'
            maxLength='8'
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
          className='register__submit button-hover'
          type='submit'
          disabled={formInValid}
        >
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
