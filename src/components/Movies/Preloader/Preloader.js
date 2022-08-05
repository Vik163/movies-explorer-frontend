import React from 'react';

import './Preloader.css';
import './Spinner.css';

function Preloader(props) {
  const { preloaderMessage, preloaderMessageError } = props;

  const spinner = () => {
    if (!preloaderMessage && !preloaderMessageError) {
      return <div className='preloader__spinner' />;
    }
  };

  return (
    <section className='preloader'>
      {spinner()}
      {preloaderMessage && (
        <span className='preloader__notFind'>{preloaderMessage}</span>
      )}
      {preloaderMessageError && (
        <span className='preloader__error'>{preloaderMessageError}</span>
      )}
    </section>
  );
}

export default Preloader;
