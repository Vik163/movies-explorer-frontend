import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Profile.css';

function Profile(props) {
  const [isToggle, setIsToggle] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  // const [infoAuth, setInfoAuth] = useState({
  //   email: '',
  //   password: '',
  // });

  const submitDisabled = `profile__submit button-hover ${
    isDisabled && 'profile__submit_disabled'
  }`;

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   setInfoAuth((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!infoAuth.email || !infoAuth.password) {
  //     return;
  //   }
  //   props.handleProfile(infoAuth);
  //   setInfoAuth({ email: '', password: '' });
  // };

  const toggle = () => {
    setIsToggle(!isToggle);
  };
  console.log(isToggle);

  return (
    <div className='profile'>
      <h2 className='profile__title'>Привет, Виталий!</h2>

      <form
        className='profile__form'
        // onSubmit={handleSubmit}
      >
        <label className='profile__label'>
          <span className='profile__input-title'>Имя</span>
          <input
            className='profile__input profile__input_type_email'
            id='email'
            type='email'
            // onChange={handleChange}
            // value={infoAuth.email ?? ''}
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
            // onChange={handleChange}
            // value={infoAuth.password ?? ''}
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
