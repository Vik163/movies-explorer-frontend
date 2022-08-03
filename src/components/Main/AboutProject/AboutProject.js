import React from 'react';

import './AboutProject.css';

function AboutProject() {
  return (
    <section id='aboutProjectId' className='aboutProject'>
      <h3 className='aboutProject__title-bar'>О проекте</h3>
      <ul className='aboutProject__container-description'>
        <li className='aboutProject__description'>
          <h3 className='aboutProject__description-title'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='aboutProject__description-subtitle'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className='aboutProject__description'>
          <h3 className='aboutProject__description-title'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='aboutProject__description-subtitle'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className='aboutProject__container-schedule'>
        <li className='aboutProject__schedule-backend'>
          <p className='aboutProject__schedule-week'>1 неделя</p>
          <p className='aboutProject__schedule-design'>Back-end</p>
        </li>
        <li className='aboutProject__schedule-frontend'>
          <p className='aboutProject__schedule-weeks'>4 недели</p>
          <p className='aboutProject__schedule-design'>Front-end</p>
        </li>
      </ul>
    </section>
  );
}

export default AboutProject;
