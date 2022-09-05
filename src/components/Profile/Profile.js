import React, { useEffect, useState, useCallback } from 'react';

import './Profile.css';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile(props) {
  const { signOut, handleUpdateUser, errorMessage, getInitialSaveCards } =
    props;
  const currentUser = React.useContext(CurrentUserContext);

  const [isToggle, setIsToggle] = useState(false);
  const [isName, setIsName] = useState('');
  const [values, setValues] = React.useState({
    name: '',
    email: '',
  });
  const [errorUser, setErrorUser] = React.useState('');
  const [inputDisabled, setInputDisabled] = useState(true);
  const [errors, setErrors] = React.useState({
    name: '',
  });
  const [inputEventTarget, setInputEventTarget] = React.useState({});
  const [disabled, setDisabled] = React.useState(true);
  const [emailValid, setEmailValid] = React.useState(false);

  useEffect(() => {
    getInitialSaveCards();
  }, []);

  //Ввод данных и валидация
  const handleChange = (event) => {
    setInputEventTarget(event.target);
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setIsName(name);
    setValues({ ...values, [name]: value });
  };

  // Валидация email и name ----------------------------------------------
  useEffect(() => {
    if (values.email) {
      if (values.email.match(/^[\w]{1}[\w-.]*@[\w-]+\.[a-z]{1,4}$/i) === null) {
        setEmailValid({
          valid: false,
          message: 'Некорректный адрес электронной почты ',
        });
      } else {
        setEmailValid({ valid: true });
      }
    }
    if (inputEventTarget.name === 'name') {
      setErrors({
        ...errors,
        [inputEventTarget.name]: inputEventTarget.validationMessage,
      });
    }
  }, [values]);

  // Поиск сравнения вводимых данных, данным зарегистророванного пользователя
  // Переключение активности кнопки submit ---------------------
  useEffect(() => {
    if (
      values.name === currentUser.name &&
      values.email === currentUser.email
    ) {
      setErrorUser('Пользователь с таким email уже существует');
      setDisabled(true);
    } else {
      setErrorUser('');

      if (emailValid.message || inputEventTarget.validationMessage) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    }
  }, [values, errors]);

  // Сброс -------------------------------
  const resetForm = useCallback(() => {
    setValues({});
    setErrors({});
    setDisabled(true);
  }, [values, errors, disabled]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser(values);
    setInputDisabled(true);
    resetForm();
  };

  // Переключатель кнопки сохранить ----
  const toggle = () => {
    setIsToggle(!isToggle);
    setInputDisabled(false);
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  };

  return (
    <div className='profile'>
      <h2 className='profile__title'>Привет, {currentUser.name}!</h2>

      <form className='profile__form' onSubmit={handleSubmit}>
        <label className='profile__label'>
          <span className='profile__input-title'>Имя</span>
          <input
            className='profile__input profile__input_type_name'
            id='name'
            type='text'
            onChange={handleChange}
            value={values.name ?? currentUser.name}
            placeholder={currentUser.name}
            name='name'
            minLength='2'
            maxLength='30'
            disabled={inputDisabled}
            required
          />
          {/* Показать ошибку валидации */}
          {isName === 'name' && (
            <span className='profile__input-error' style={{ display: 'block' }}>
              {errors.name}
            </span>
          )}
        </label>
        <label className='profile__label'>
          <span className='profile__input-title'>Почта</span>
          <input
            className='profile__input profile__input_type_email'
            id='email'
            type='email'
            onChange={handleChange}
            value={values.email ?? currentUser.name}
            placeholder={currentUser.email}
            name='email'
            disabled={inputDisabled}
            required
          />
          {/* Показать ошибку валидации */}
          {isName === 'email' && (
            <span className='profile__input-error' style={{ display: 'block' }}>
              {emailValid.message}
            </span>
          )}
        </label>
        <button
          className='profile__submit button-hover'
          type='submit'
          onClick={toggle}
          // Изменение кнопки "сохранить" -----------
          style={{ display: !isToggle && 'none' }}
          disabled={disabled}
        >
          Сохранить
        </button>
      </form>
      <span className='profile__error'>
        {errorMessage}
        {errorUser}
      </span>
      {/* Изменение кнопки "редактировать" */}
      <div
        className='profile__edit-container'
        style={{ display: isToggle && 'none' }}
      >
        <span className='profile__edit button-hover' onClick={toggle}>
          Редактировать
        </span>
        <span className='profile__caption-link button-hover' onClick={signOut}>
          Выйти из аккаунта
        </span>
      </div>
    </div>
  );
}

export default Profile;
