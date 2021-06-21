import React from 'react';
import CommonContainer from 'components/layouts/Containers/CommonContainer';
import StatCard from 'components/common/cards/StatCard';
import Chart from 'components/common/cards/Chart';

const OrganizationStats = () => (
  <>
    <CommonContainer
      title="Your Organization"
    />
    <div className="row">
      <StatCard
        label="Total Events"
        value="2000"
        link="Lolz"
        linkLabel="View"
      />
      <StatCard
        label="Events Completed"
        value="2000"
        link="Lolz"
        linkLabel="View"
      />
      <StatCard
        label="Events in Progress"
        value="2000"
        link="Lolz"
        linkLabel="View"
      />
      <StatCard
        label="Total pledges received"
        value="2000"
        link="Lolz"
        linkLabel="View"
      />
      <Chart
        // key={resource.id}
        label="Event Progress"
        value={29}
      />
      <Chart
        // key={resource.id}
        label="Project Success Rate"
        value={29}
      />
      <StatCard
        label="Most Popular Event"
        value="Blood donation Campaign 2020"
        link="Lolz"
        linkLabel="View"
      />
    </div>
  </>
);

export default OrganizationStats;
