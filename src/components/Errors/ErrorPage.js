import React from 'react';
import { Link } from 'react-router-dom';

import './ErrorPage.css';

function ErrorPage(props) {
  const {errorPageMessage} = props
  return (
    <div className='errorPage'>
      <h2 className='errorPage__status'>{errorPageMessage.statusCode}</h2>
      <p className='errorPage__message'>
        {errorPageMessage.message}
      </p>
      <Link className='errorPage__link button-hover' to='/movies'>
        Назад
      </Link>
    </div>
  );
}

export default ErrorPage;
