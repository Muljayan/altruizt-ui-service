import React from 'react';
import Body from 'components/layouts/Body';
import StatCard from 'components/common/cards/StatCard';
import SuperAdminStats from './SuperAdminStats';
import YourActivityStats from './YourActivityStats';
import OrganizationStats from './OrganizationStats';
import ResourceStats from './ResourceStats';
import ResourceSuggestion from './ResourceSuggestion';

const MainDashboard = () => (
  <Body
    title="Dashboard"
  >
    <div className="row">

      <StatCard
        label="Your Profile"
        value="2000"
        link="Lolz"
        linkLabel="View All"
      />

    </div>
    <SuperAdminStats />
    <YourActivityStats />
    <OrganizationStats />
    <ResourceStats />
    <ResourceSuggestion />
  </Body>
);

export default MainDashboard;
