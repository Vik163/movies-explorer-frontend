import React from 'react';

import './Techs.css';

function Techs() {
  return (
    <section className='techs' id='techsId'>
      <h3 className='techs__title-bar'>Технологии</h3>
      <h2 className='techs__title'>7 технологий</h2>
      <p className='techs__subtitle'>
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className='techs__languages-container'>
        <li className='techs__languages'>HTML</li>
        <li className='techs__languages'>CSS</li>
        <li className='techs__languages'>JS</li>
        <li className='techs__languages'>React</li>
        <li className='techs__languages'>Git</li>
        <li className='techs__languages'>Express.js</li>
        <li className='techs__languages'>mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;
