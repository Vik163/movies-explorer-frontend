import React from 'react';
import { Link } from 'react-router-dom';

import './Navigation.css';
import '../Header/Header.css';

import closeIcon from '../../images/closeIcon.svg';

function Navigation(props) {
  const { isAddInfo, toggle, headerInfo } = props;
  return (
    <>
      <div
        className='header__menu-shadow'
        style={{ display: isAddInfo.display }}
      ></div>
      {isAddInfo.src === closeIcon ? (
        // Открытая панель навигации -----------------------------------------
        <div className='header__menu' style={{ display: isAddInfo.display }}>
          <div className='header__menu-links'>
            <Link
              className='header__link header__link_activ button-hover'
              to='/'
            >
              Главная
            </Link>
            {headerInfo}
          </div>
          <Link className='header__account button-hover' to='/profile'></Link>
          <img
            className='header__icon header__icon-closeIcon button-hover'
            onClick={toggle}
            src={`${isAddInfo.src}`}
            alt='Кнопка'
          />
        </div>
      ) : (
        // Cкрытая панель навигации -----------------------------------------
        <img
          className='header__icon button-hover'
          onClick={toggle}
          src={`${isAddInfo.src}`}
          alt='Кнопка'
        />
      )}
    </>
  );
}

export default Navigation;
