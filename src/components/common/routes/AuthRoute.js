import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';

const getAuthStatus = createSelector(
  (state) => state.auth,
  (auth) => auth.isAuthenticated,
);

const AuthRoute = (props) => {
  const { children, path } = props;
  const isAuthenticated = useSelector(getAuthStatus);
  return (
    <Route
      exact
      path={path}
      render={({ location }) => (!isAuthenticated ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: location },
          }}
        />
      ))}
    />
  );
};

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
};

export default AuthRoute;
