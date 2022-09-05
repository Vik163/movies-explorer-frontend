import React from 'react';

import './Preloader.css';
import './Spinner.css';

function Preloader(props) {
  const { preloaderMessage } = props;

  return (
    <section className='preloader'>
      {preloaderMessage ? (
        <span className='preloader__notFind'>{preloaderMessage}</span>
      ) : (
        <div className='preloader__spinner' />
      )}
    </section>
  );
}

export default Preloader;
