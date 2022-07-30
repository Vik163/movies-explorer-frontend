import React from 'react';

import './Portfolio.css';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <ul className='portfolio__navbar'>
        <li className='portfolio__navbar-item button-hover'>
          <a
            className='portfolio__link'
            href='https://github.com/Vik163/how-to-learn'
            target='_blank'
            rel='noreferrer'
          >
            Статичный сайт
          </a>
        </li>
        <li className='portfolio__navbar-item button-hover'>
          <a
            className='portfolio__link'
            href='https://github.com/Vik163/russian-travel'
            target='_blank'
            rel='noreferrer'
          >
            Адаптивный сайт
          </a>
        </li>
        <li className='portfolio__navbar-item button-hover'>
          <a
            className='portfolio__link'
            href='https://github.com/Vik163/react-mesto-api-full'
            target='_blank'
            rel='noreferrer'
          >
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
