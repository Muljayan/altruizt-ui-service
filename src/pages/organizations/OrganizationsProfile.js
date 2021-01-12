import React from 'react';
import Sidebar from 'components/layouts/Sidebars/Common';
import Body from 'components/layouts/Body';
import ResourceCard from 'components/common/cards/ResourceCard';
import DescriptionCard from 'components/common/cards/DescriptionCard';
import StatCard from 'components/common/cards/StatCard';
import EventsCard from 'components/common/cards/EventsCard';

const OrganizationsProfile = () => (
  <Body
    sidebar={<Sidebar />}
    title="ABC Club of Colombo"
  >
    <DescriptionCard />
    <ResourceCard
      title="Resources Needed"
    />
    <div className="row">
      <StatCard
        label="Events Completed"
        value={50}
      />
      <StatCard
        label="Current Events"
        value={50}
      />
      <StatCard
        label="Resources Required"
        value={50}
      />
    </div>
    <EventsCard
      title="Current Events"
    />
    <EventsCard
      title="Past Events"
    />
  </Body>
);

export default OrganizationsProfile;
