import React from 'react';

import './NavTab.css';

function NavTab() {
  return (
    <section className='navTab'>
      <a className='navTab__link button-hover' href='#aboutProjectId'>
        О проекте
      </a>
      <a className='navTab__link button-hover' href='#techsId'>
        Технологии
      </a>
      <a className='navTab__link button-hover' href='#aboutMeId'>
        Студент
      </a>
    </section>
  );
}

export default NavTab;
