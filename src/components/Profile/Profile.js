import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Profile.css';

function Profile(props) {
  const [isToggle, setIsToggle] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const submitDisabled = `profile__submit button-hover ${
    isDisabled && 'profile__submit_disabled'
  }`;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const toggle = () => {
    setIsToggle(!isToggle);
  };

  return (
    <div className='profile'>
      <h2 className='profile__title'>Привет, Виталий!</h2>

      <form className='profile__form' onSubmit={handleSubmit}>
        <label className='profile__label'>
          <span className='profile__input-title'>Имя</span>
          <input
            className='profile__input profile__input_type_email'
            id='email'
            type='email'
            placeholder='Email'
            name='email'
            required
          />
        </label>
        <label className='profile__label'>
          <span className='profile__input-title'>Пароль</span>
          <input
            className='profile__input profile__input_type_password'
            id='password'
            type='password'
            placeholder='Пароль'
            name='password'
            required
          />
        </label>
        <button
          className={submitDisabled}
          type='submit'
          onClick={toggle}
          style={{ display: !isToggle && 'none' }}
          disabled={isDisabled}
        >
          Сохранить
        </button>
      </form>
      <span className='profile__error'>
        {/* {props.errorMessage} */}
        При обновлении профиля произошла ошибка.
      </span>
      <div
        className='profile__edit-container'
        style={{ display: isToggle && 'none' }}
      >
        <span className='profile__edit' onClick={toggle}>
          Редактировать
        </span>
        <Link className='profile__caption-link button-hover' to='/sign-in'>
          Выйти из аккаунта
        </Link>
      </div>
    </div>
  );
}

export default Profile;
