import React from 'react';
import { Link } from 'react-router-dom';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';

const getAuthStatus = createSelector(
  (state) => state.auth,
  (auth) => auth.isAuthenticated,
);

const Landing = () => {
  const isAuthenticated = useSelector(getAuthStatus);
  console.log({ isAuthenticated });
  if (isAuthenticated) {
    return <></>;
  }
  return (
    <div className="landing">
      <h1>Welcome to the Altruizt Platform</h1>
      <h4>A Community Driven Civic Engagement Platform</h4>
      <p>
        A centralized place to seek help and find people who need help.
        <br />
        You can use this platform without signing in however you need to login
        for full functionality
      </p>
      <div className="btn-container center">
        <Link className="btn btn-primary mx-1" to="/register">
          Register
        </Link>
        <Link className="btn btn-outline-primary mx-1" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Landing;
