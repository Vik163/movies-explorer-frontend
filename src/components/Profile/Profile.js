import React, { useEffect, useState, useCallback } from 'react';

import './Profile.css';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [isToggle, setIsToggle] = useState(false);
  const [isName, setIsName] = useState('');
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [disabled, setDisabled] = React.useState(true);
  const [inputDisabled, setInputDisabled] = useState(true);
  const [isInputsValid, setIsInputsValid] = React.useState({
    name: false,
    email: false,
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
    setDisabled(hasInvalidInputs());
  }, [errors]);

  const resetForm = useCallback(() => {
    setValues({});
    setErrors({});
    setIsInputsValid({
      name: false,
      email: false,
    });
    setDisabled(true);
  }, [setValues, setErrors, setIsInputsValid, setDisabled]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleUpdateUser(values)
    setInputDisabled(true);
    resetForm();
  };

  const toggle = () => {
    setIsToggle(!isToggle);
    setInputDisabled(false);
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
            value={values.name ?? ''}
            placeholder='Имя'
            name='name'
            minLength='2'
            maxLength='30'
            disabled={inputDisabled}
            required
          />
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
            value={values.email ?? ''}
            placeholder='Email'
            name='email'
            disabled={inputDisabled}
            required
          />
          {isName === 'email' && (
            <span className='profile__input-error' style={{ display: 'block' }}>
              {errors.email}
            </span>
          )}
        </label>
        <button
          className='profile__submit button-hover'
          type='submit'
          onClick={toggle}
          style={{ display: !isToggle && 'none' }}
          disabled={disabled}
        >
          Сохранить
        </button>
      </form>
      <span className='profile__error'>
        {props.errorMessage}
      </span>
      <div
        className='profile__edit-container'
        style={{ display: isToggle && 'none' }}
      >
        <span className='profile__edit button-hover' onClick={toggle}>
          Редактировать
        </span>
        <span
          className='profile__caption-link button-hover'
          onClick={props.signOut}
        >
          Выйти из аккаунта
        </span>
      </div>
    </div>
  );
}

export default Profile;
