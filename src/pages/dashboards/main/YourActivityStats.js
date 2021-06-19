import React from 'react';
import CommonContainer from 'components/layouts/Containers/CommonContainer';
import StatCard from 'components/common/cards/StatCard';

const YourActivityStats = () => (
  <>
    <CommonContainer
      title="Your Activities"
    />
    <div className="row">
      <StatCard
        label="Events Followed"
        value="2000"
        link="Lolz"
        linkLabel="View All"
      />
      <StatCard
        label="Events Pledged"
        value="2000"
        link="Lolz"
        linkLabel="View All"
      />
      <StatCard
        label="Organizations Followed"
        value="2000"
        link="Lolz"
        linkLabel="View All"
      />
    </div>
  </>
);

export default YourActivityStats;
