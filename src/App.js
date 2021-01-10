import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

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
import Opportunities from 'pages/opportunities/Opportunities';
import OpportunitiesProfile from 'pages/opportunities/OpportunitiesProfile';
import Organizations from 'pages/organizations/Organizations';
import OrganizationsProfile from 'pages/organizations/OrganizationsProfile';
import Profile from 'pages/profile/Profile';

import './styles/global.scss';

const App = () => (
  <>
    <Router>
      <Header />
      <Switch>
        {/* Home */}
        <Route exact path="/">
          <Home />
        </Route>

        {/* Dashboards */}
        <Route exact path="/dashboards/approvals">
          <ApprovalsDashboard />
        </Route>
        <Route exact path="/dashboards/events">
          <EventsDashboard />
        </Route>
        <Route exact path="/dashboards/organizations">
          <OrganizationsDashboard />
        </Route>
        <Route exact path="/dashboards/pledges">
          <PledgesDashboard />
        </Route>

        {/* Events */}
        <Route exact path="/events">
          <Events />
        </Route>
        <Route exact path="/events/create">
          <CreateEvent />
        </Route>
        <Route exact path="/events/:id">
          <EventProfile />
        </Route>
        <Route exact path="/events/:id/update">
          <UpdateEvent />
        </Route>

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
        <Route exact path="/profile">
          <Profile />
        </Route>

      </Switch>
    </Router>
  </>
);

export default App;
