import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';

const getAuthStatus = createSelector(
  (state) => state.auth,
  (auth) => auth.isAuthenticated,
);

const PrivateRoute = (props) => {
  const { children, path } = props;
  const isAuthenticated = useSelector(getAuthStatus);
  return (
    <Route
      exact
      path={path}
      render={({ location }) => (isAuthenticated ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      ))}
    />
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
};

export default PrivateRoute;
