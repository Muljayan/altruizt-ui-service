import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';

import Header from 'components/layouts/Header';

import ApprovalsDashboard from 'pages/dashboards/ApprovalsDashboard';
import EventsDashboard from 'pages/dashboards/EventsDashboard';
import OrganizationsDashboard from 'pages/dashboards/OrganizationsDashboard';
import PledgesDashboard from 'pages/dashboards/PledgesDashboard';
import Home from 'pages/home/Home';
import Events from 'pages/events/Events';
import CreateEvent from 'pages/events/CreateEvent';
import EventProfile from 'pages/events/EventProfile';
import UpdateEvent from 'pages/events/UpdateEvent';
import Followings from 'pages/Followings/Followings';
import Opportunities from 'pages/opportunities/Opportunities';
import OpportunitiesProfile from 'pages/opportunities/OpportunitiesProfile';
import Organizations from 'pages/organizations/Organizations';
import OrganizationsProfile from 'pages/organizations/OrganizationsProfile';
import Profile from 'pages/profile/Profile';
import ProfileEdit from 'pages/profile/ProfileEdit';

import './styles/global.scss';
import Login from 'pages/auth/Login';
import Register from 'pages/auth/Register';
import NotFound from 'pages/errors/NotFound';

import PrivateRoute from 'components/common/routes/PrivateRoute';
import AuthRoute from 'components/common/routes/AuthRoute';

import { CLEAR_CURRENT_USER, SET_CURRENT_USER } from 'actions/types';

import store from 'store';

// Check if token exists
const token = localStorage.jwtToken;
if (token) {
  const decoded = jwt.decode(token);
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    console.log('token expired');
    store.dispatch({ type: CLEAR_CURRENT_USER });
  } else {
    console.log('token not expired');
    store.dispatch({ type: SET_CURRENT_USER, payload: token });
  }
}

const App = () => (
  <Provider
    store={store}
  >
    <Router>
      <Header />
      <Switch>
        {/* Auth */}
        <AuthRoute
          exact
          path="/login"
        >
          <Login />
        </AuthRoute>
        <AuthRoute
          exact
          path="/register"
        >
          <Register />
        </AuthRoute>

        {/* Home */}
        <Route exact path="/">
          <Home />
        </Route>

        {/* Dashboards */}
        <PrivateRoute exact path="/dashboards/approvals">
          <ApprovalsDashboard />
        </PrivateRoute>
        <PrivateRoute exact path="/dashboards/events">
          <EventsDashboard />
        </PrivateRoute>
        <PrivateRoute exact path="/dashboards/organizations">
          <OrganizationsDashboard />
        </PrivateRoute>
        <PrivateRoute exact path="/dashboards/pledges">
          <PledgesDashboard />
        </PrivateRoute>

        {/* Events */}
        <Route exact path="/events">
          <Events />
        </Route>
        <Route exact path="/events/profile/:id">
          <EventProfile />
        </Route>
        <PrivateRoute exact path="/events/create">
          <CreateEvent />
        </PrivateRoute>
        <PrivateRoute exact path="/events/profile/:id/update">
          <UpdateEvent />
        </PrivateRoute>
        <PrivateRoute exact path="/followings">
          <Followings />
        </PrivateRoute>

        {/* Opportunities */}
        <Route exact path="/opportunities">
          <Opportunities />
        </Route>
        <Route exact path="/opportunities/:id">
          <OpportunitiesProfile />
        </Route>

        {/* Organizations */}
        <Route exact path="/organizations">
          <Organizations />
        </Route>
        <Route exact path="/organizations/:id">
          <OrganizationsProfile />
        </Route>

        {/* Profile */}
        <PrivateRoute exact path="/profile">
          <Profile />
        </PrivateRoute>
        <PrivateRoute exact path="/profile/edit">
          <ProfileEdit />
        </PrivateRoute>
        <Route component={NotFound} />
      </Switch>
    </Router>
  </Provider>
);

export default App;
