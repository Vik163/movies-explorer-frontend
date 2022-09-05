import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';
import './Header.css';

import headerLogo from '../../images/logo.svg';
import icon__Toggle from '../../images/icon__Toggle.svg';
import closeIcon from '../../images/closeIcon.svg';

function Header(props) {
  const [isDesktop, setIsDesktop] = useState(
    window.matchMedia('(min-width: 780px)').matches
  );
  const [isToggle, setIsToggle] = useState(false);
  const [isAddInfo, setIsAddInfo] = useState({
    display: 'none',
    src: icon__Toggle,
  });

  // Ссылки на страницы фильмов --------------------------------
  const headerInfo = (
    <div className='header__navbar'>
      <Link
        className='header__link header__link_activ button-hover'
        to='/movies'
      >
        Фильмы
      </Link>
      <Link
        className='header__link header__link_activ button-hover'
        to='/saved-movies'
      >
        Сохранённые фильмы
      </Link>
    </div>
  );

  // Кнопки регистрации и авторизации --------------------------------
  const headerRegister = (
    <div className='header__register-container'>
      <Link className='header__register button-hover' to='/sign-up'>
        Регистрация
      </Link>
      <Link className='button-hover' to='/sign-in'>
        <button
          className='header__in button-hover'
          aria-label='in'
          type='button'
        >
          Войти
        </button>
      </Link>
    </div>
  );

  // Контроль размера страницы -----------------------------------------
  useEffect(() => {
    const handler = (e) => setIsDesktop(e.matches);
    window.matchMedia('(min-width: 780px)').addEventListener('change', handler);
    return () =>
      window
        .matchMedia('(min-width: 780px)')
        .removeEventListener('change', handler);
  }, []);

  // Установка формы кнопки навигации ----------------------------
  useEffect(() => {
    isToggle
      ? setIsAddInfo({ display: 'flex', src: closeIcon })
      : setIsAddInfo({ display: 'none', src: icon__Toggle });
  }, [isToggle]);

  const toggle = () => {
    setIsToggle(!isToggle);
  };

  return (
    <header className='header page__header'>
      <Link className='button-hover' to='/'>
        <img className='header__logo' src={headerLogo} alt='Логотип' />
      </Link>
      {/*Форма навигации в зависимости от авторизации и размера*/}
      {!props.loggedIn ? (
        <div>{headerRegister}</div>
      ) : isDesktop ? (
        <>
          <div>{headerInfo}</div>
          <Link className='button-hover' to='/profile'>
            <button
              className='header__account'
              aria-label='in'
              type='button'
              to='/profile'
            ></button>
          </Link>
        </>
      ) : (
        <Navigation
          isAddInfo={isAddInfo}
          toggle={toggle}
          headerInfo={headerInfo}
        />
      )}
    </header>
  );
}

export default Header;
