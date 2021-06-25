/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';

import './styles/global.scss';

import Header from 'components/layouts/Header';

import ApprovalsDashboard from 'pages/dashboards/superadmin/ApprovalsDashboard';
import BeneficiariesDashboard from 'pages/dashboards/superadmin/BeneficiariesDashboard';
import EventsMonitorDashboard from 'pages/dashboards/superadmin/EventsDashboard';
import IndividualsDashboard from 'pages/dashboards/superadmin/IndividualsDashboard';
import CorporatesDashboard from 'pages/dashboards/superadmin/CorporatesDashboard';
import VolunteersDashboard from 'pages/dashboards/superadmin/VolunteersDashboard';

// import EventsDashboard from 'pages/dashboards/organization/EventsDashboard';
import PledgesDashboard from 'pages/dashboards/organization/PledgesDashboard';

import Profile from 'pages/profile/Profile';

import Home from 'pages/home/Home';
import Events from 'pages/events/Events';
import CreateEvent from 'pages/events/CreateEvent';
import EventProfile from 'pages/events/EventProfile';
import UpdateEvent from 'pages/events/UpdateEvent';
import CompleteEvent from 'pages/events/CompleteEvent';

import Followings from 'pages/Followings/Followings';
import Opportunities from 'pages/opportunities/Opportunities';
import OpportunitiesProfile from 'pages/opportunities/OpportunitiesProfile';
import Organizations from 'pages/organizations/Organizations';
import OrganizationsProfile from 'pages/organizations/OrganizationsProfile';
import MainDashboard from 'pages/dashboards/main';

import Login from 'pages/auth/Login';
import Register from 'pages/auth/Register';
import NotFound from 'pages/errors/NotFound';

import PrivateRoute from 'components/common/routes/PrivateRoute';
import AuthRoute from 'components/common/routes/AuthRoute';

import { CLEAR_CURRENT_USER, SET_CURRENT_USER } from 'actions/types';

import store from 'store';
import GlobalNotifier from 'components/common/notifiers/GlobalNotifier';
import Disclaimer from 'components/layouts/Disclaimer';

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

const App = () => {
  const [accepted, setaccepted] = useState(false);

  const _close = () => {
    setaccepted(true);
  };

  return (
    <Provider
      store={store}
    >
      <Router>
        {
          accepted
            ? (
              <>
                <Header />
                <Switch>
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

                  <Route exact path="/">
                    <Home />
                  </Route>

                  <PrivateRoute exact path="/dashboards/approvals">
                    <ApprovalsDashboard />
                  </PrivateRoute>
                  <PrivateRoute exact path="/dashboards/pledges">
                    <PledgesDashboard />
                  </PrivateRoute>

                  <Route exact path="/events">
                    <Events />
                  </Route>
                  <PrivateRoute exact path="/events/create">
                    <CreateEvent />
                  </PrivateRoute>
                  <Route exact path="/events/profile/:id">
                    <EventProfile />
                  </Route>
                  <PrivateRoute exact path="/events/profile/:id/update">
                    <UpdateEvent />
                  </PrivateRoute>
                  <PrivateRoute exact path="/events/profile/:id/complete">
                    <CompleteEvent />
                  </PrivateRoute>
                  <PrivateRoute exact path="/followings">
                    <Followings />
                  </PrivateRoute>

                  <Route exact path="/opportunities">
                    <Opportunities />
                  </Route>
                  <Route exact path="/opportunities/profile/:id">
                    <OpportunitiesProfile />
                  </Route>

                  <Route exact path="/organizations">
                    <Organizations />
                  </Route>
                  <Route exact path="/organizations/profile/:id">
                    <OrganizationsProfile />
                  </Route>

                  <PrivateRoute exact path="/profile">
                    <Profile />
                  </PrivateRoute>
                  <PrivateRoute exact path="/dashboard">
                    <MainDashboard />
                  </PrivateRoute>

                  <PrivateRoute level="superadmin" exact path="/dashboard/manage/approvals">
                    <ApprovalsDashboard />
                  </PrivateRoute>
                  <PrivateRoute level="superadmin" exact path="/dashboard/manage/beneficiaries">
                    <BeneficiariesDashboard />
                  </PrivateRoute>
                  <PrivateRoute level="moderator" exact path="/dashboard/manage/events">
                    <EventsMonitorDashboard />
                  </PrivateRoute>
                  <PrivateRoute level="superadmin" exact path="/dashboard/manage/individuals">
                    <IndividualsDashboard />
                  </PrivateRoute>
                  <PrivateRoute level="superadmin" exact path="/dashboard/manage/corporates">
                    <CorporatesDashboard />
                  </PrivateRoute>
                  <PrivateRoute level="superadmin" exact path="/dashboard/manage/volunteers">
                    <VolunteersDashboard />
                  </PrivateRoute>
                  <PrivateRoute exact path="/dashboard/organization/pledges">
                    <PledgesDashboard />
                  </PrivateRoute>

                  <Route component={NotFound} />
                </Switch>
                <GlobalNotifier />
              </>
            ) : (
              <Disclaimer close={_close} />
            )
        }
      </Router>
    </Provider>
  );
};
export default App;
