import React from 'react';

import './Preloader.css';
import './Spinner.css';

function Preloader() {
  return (
    <section className='preloader'>
      <div className='preloader__spinner' />
      <span className='preloader__notFind'>Ничего не найдено</span>
      <span className='preloader__error'>
        Возможно, проблема с соединением или сервер недоступен. Подождите
        немного и попробуйте ещё раз
      </span>
    </section>
  );
}

export default Preloader;
