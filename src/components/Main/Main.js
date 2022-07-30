import React from 'react';

import './Main.css';
import AboutMe from './AboutMe/AboutMe.js';
import Promo from './Promo/Promo.js';
import AboutProject from './AboutProject/AboutProject.js';
import Techs from './Techs/Techs.js';
import Portfolio from './Portfolio/Portfolio.js';

// import Card from './Card.js';

function Main() {
  return (
    <main className='main'>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  );
}

export default Main;
