import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = (props) => {
  const { component: Component, path } = props;
  const isAuthenticated = false;

  return (
    <Route
      // exact
      path={path}
      render={() => (
        isAuthenticated
          ? (
            <>
              <Component />
            </>
          )
          : (
            <Redirect
              to="/"
            />
          ))}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
};

export default PrivateRoute;
