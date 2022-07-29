import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.css';

function ErrorPage(props) {
  return (
    <div className='errorPage'>
      {/* <h2 className='errorPage__status'>{props.statusCode}</h2>
      <p className='errorPage__message'>{props.message}</p> */}
      <h2 className='errorPage__status'>404</h2>
      <p className='errorPage__message'>
        Страница по указанному маршруту не найдена
      </p>

      <Link className='errorPage__link button-hover' to='/'>
        Назад
      </Link>
    </div>
  );
}

export default ErrorPage;
