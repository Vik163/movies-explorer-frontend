import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ loggedIn, children, ...props }) => {
  if (
    props.computedMatch.url === '/sign-up' ||
    props.computedMatch.url === '/sign-in'
  ) {
    return (
      <Route {...props}>{!loggedIn ? children : <Redirect to='/' />}</Route>
    );
  }
  return <Route {...props}>{loggedIn ? children : <Redirect to='/' />}</Route>;
};

export default ProtectedRoute;
