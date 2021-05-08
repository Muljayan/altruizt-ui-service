import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
import NotFound from 'pages/errors/NotFound';

const getAuthStatus = createSelector(
  (state) => state.auth,
  (auth) => auth,
);

const PrivateRoute = (props) => {
  const { children, path, level } = props;
  const { isAuthenticated, isSuperAdmin, organization } = useSelector(getAuthStatus);

  let component;
  switch (level) {
    case 'superadmin':
      component = isSuperAdmin ? children : <NotFound />;
      break;
    case 'moderator':
      component = (isSuperAdmin || organization) ? children : <NotFound />;
      break;
    default:
      component = children;
      break;
  }

  return (
    <Route
      exact
      path={path}
      render={({ location }) => (isAuthenticated ? (
        component
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
  level: PropTypes.string,
};

PrivateRoute.defaultProps = {
  level: null,
};

export default PrivateRoute;
