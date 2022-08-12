import React from 'react';

import './Preloader.css';
import './Spinner.css';

function Preloader(props) {
  const { preloaderMessage } = props;

  const spinner = () => {
    if (!preloaderMessage) {
      return <div className='preloader__spinner' />;
    }
  };

  return (
    <section className='preloader'>
      {spinner()}
      {preloaderMessage && (
        <span className='preloader__notFind'>{preloaderMessage}</span>
      )}
    </section>
  );
}

export default Preloader;
