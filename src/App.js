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
        <Route path="/">
          <Home />
        </Route>

        {/* Dashboards */}
        <Route path="/dashboards/approvals">
          <ApprovalsDashboard />
        </Route>
        <Route path="/dashboards/events">
          <EventsDashboard />
        </Route>
        <Route path="/dashboards/organizations">
          <OrganizationsDashboard />
        </Route>
        <Route path="/dashboards/pledges">
          <PledgesDashboard />
        </Route>

        {/* Events */}
        <Route path="/events">
          <Events />
        </Route>
        <Route path="/events/create">
          <CreateEvent />
        </Route>
        <Route path="/events/:id">
          <EventProfile />
        </Route>
        <Route path="/events/:id/update">
          <UpdateEvent />
        </Route>

        {/* Opportunities */}
        <Route path="/opportunities">
          <Opportunities />
        </Route>
        <Route path="/opportunities/:id">
          <OpportunitiesProfile />
        </Route>

        {/* Organizations */}
        <Route path="/organizations">
          <Organizations />
        </Route>
        <Route path="/organizations/:id">
          <OrganizationsProfile />
        </Route>

        {/* Profile */}
        <Route path="/profile">
          <Profile />
        </Route>

      </Switch>
    </Router>
  </>
);

export default App;
