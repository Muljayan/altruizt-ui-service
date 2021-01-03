import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = (props) => {
  const { component: Component, path } = props;
  const isAuthenticated = false;

  return (
    <Route
      exact
      path={path}
      render={() => (
        isAuthenticated
          ? (
            <Redirect
              to="/"
            />
          )
          : (
            <Component />
          ))}
    />
  );
};

PublicRoute.propTypes = {
  component: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
};

export default PublicRoute;
