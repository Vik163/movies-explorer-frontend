import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

  const headerInfo = (
    <div className='header__navbar'>
      <Link
        className='header__link header__link_activ button-hover'
        // onClick={props.signOut}
        // to={props.link}
      >
        Фильмы
      </Link>
      <Link
        className='header__link header__link_activ button-hover'
        // onClick={props.signOut}
        // to={props.link}
      >
        Сохранённые фильмы
      </Link>
    </div>
  );

  const headerRegister = (
    <div className='header__register-container'>
      <Link
        className='header__register button-hover'
        // onClick={props.signOut}
        // to={props.link}
      >
        Регистрация
      </Link>
      <button
        className='header__in button-hover'
        aria-label='in'
        type='button'
        // onClick={''}
      >
        Войти
      </button>
    </div>
  );

  useEffect(() => {
    const handler = (e) => setIsDesktop(e.matches);
    window.matchMedia('(min-width: 780px)').addEventListener('change', handler);
    return () =>
      window
        .matchMedia('(min-width: 780px)')
        .removeEventListener('change', handler);
  }, []);

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
      <img className='header__logo' src={headerLogo} alt='Логотип' />
      {props.loggedIn ? (
        <div>{headerRegister}</div>
      ) : isDesktop ? (
        <>
          <div>{headerInfo}</div>
          <button
            className='header__account button-hover'
            aria-label='in'
            type='button'
            // onClick={''}
          ></button>
        </>
      ) : (
        <>
          <div
            className='header__menu-shadow'
            style={{ display: isAddInfo.display }}
          ></div>
          {isAddInfo.src === closeIcon ? (
            <div
              className='header__menu'
              style={{ display: isAddInfo.display }}
            >
              <Link
                className='header__link header__link_activ button-hover'
                // onClick={props.signOut}
                // to={props.link}
              >
                Главная
              </Link>
              {headerInfo}
              <button
                className='header__account button-hover'
                aria-label='in'
                type='button'
                // onClick={''}
              ></button>
              <img
                className='header__icon header__icon-closeIcon button-hover'
                onClick={toggle}
                src={`${isAddInfo.src}`}
                alt='Кнопка'
              />
            </div>
          ) : (
            <img
              className='header__icon button-hover'
              onClick={toggle}
              src={`${isAddInfo.src}`}
              alt='Кнопка'
            />
          )}
        </>
      )}
    </header>
  );
}

export default Header;
