import React from 'react';

import './AboutMe.css';
import foto from '../../../images/DSCF1927.jpg';

function AboutMe() {
  return (
    <section className='aboutMe' id='aboutMeId'>
      <h3 className='aboutMe__title-bar'>Студент</h3>
      <div className='aboutMe__container'>
        <div className='aboutMe__description-container'>
          <h2 className='aboutMe__title'>Виктор</h2>
          <p className='aboutMe__subtitle'>Фронтенд-разработчик, 47 лет</p>
          <p className='aboutMe__description'>
            Я родился и живу в Самаре, закончил СамГТУ. У меня есть жена и два
            сына. Я люблю читать и слушать музыку. Недавно начал кодить. Работаю
            и прохожу курс по веб-разработке.
          </p>
          <ul className='aboutMe__navbar'>
            <li className='aboutMe__navbar-item button-hover'>
              <a
                className='aboutMe__link'
                href='https://vk.com/'
                target='_blank'
                rel='noreferrer'
              >
                ВКонтакте
              </a>
            </li>
            <li className='aboutMe__navbar-item button-hover'>
              <a
                className='aboutMe__link'
                href='https://github.com/'
                target='_blank'
                rel='noreferrer'
              >
                Github
              </a>
            </li>
          </ul>
        </div>
        <img className='aboutMe__foto' src={foto} alt='фото' />
      </div>
    </section>
  );
}

export default AboutMe;
