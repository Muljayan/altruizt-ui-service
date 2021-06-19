import React from 'react';
import CommonContainer from 'components/layouts/Containers/CommonContainer';
import StatCard from 'components/common/cards/StatCard';

const SuperAdminStats = () => (
  <>
    <CommonContainer
      title="Super Admin"
    />
    {/* Super admin */}
    <div className="row">
      <StatCard
        label="Total Individuals"
        value="2000"
        link="Lolz"
        linkLabel="View All"
      />
      <StatCard
        label="Waiting for Approval"
        value="2000"
        link="/dashboard/manage/approvals"
        linkLabel="View All"
      />
      <StatCard
        label="Corporates"
        value="2000"
        link="/dashboard/manage/approvals"
        linkLabel="View All"
      />
      <StatCard
        label="Volunteer Organizations"
        value="2000"
        link="/dashboard/manage/volunteers"
        linkLabel="View All"
      />
      <StatCard
        label="Beneficiaries"
        value="2000"
        link="/dashboard/manage/beneficiaries"
        linkLabel="View All"
      />
      <StatCard
        label="Events"
        value="2000"
        link="/dashboard/manage/events"
        linkLabel="View All"
      />
    </div>

  </>
);

export default SuperAdminStats;
