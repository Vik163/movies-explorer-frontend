import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import './ErrorPage.css';

function ErrorPage(props) {
  const { errorPageMessage } = props;

  useEffect(() => {
    props.addPageNotFound();
  }, []);

  return (
    <div className='errorPage'>
      <h2 className='errorPage__status'>
        {errorPageMessage ? errorPageMessage.statusCode : 404}
      </h2>
      <p className='errorPage__message'>
        {errorPageMessage
          ? errorPageMessage.message
          : 'Страница по указанному маршруту не найдена'}
      </p>
      <Link className='errorPage__link button-hover' to='/movies'>
        Назад
      </Link>
    </div>
  );
}

export default ErrorPage;
