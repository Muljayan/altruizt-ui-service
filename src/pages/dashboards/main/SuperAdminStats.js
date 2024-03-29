import React from 'react';
import PropTypes from 'prop-types';
import CommonContainer from 'components/layouts/Containers/CommonContainer';
import StatCard from 'components/common/cards/StatCard';

const SuperAdminStats = (props) => {
  const {
    data,
  } = props;
  const {
    individuals,
    approvals,
    corporates,
    volunteerOrganizations,
    beneficiaries,
    events,
    resources,
    categories,
  } = data;
  return (
    <>
      <CommonContainer
        title="Super Admin"
      />
      {/* Super admin */}
      <div className="row">
        <StatCard
          label="Waiting for Approval"
          value={approvals}
          link="/dashboard/manage/approvals"
          linkLabel="View"
        />
        <StatCard
          label="Corporates"
          value={corporates}
          link="/dashboard/manage/corporates"
          linkLabel="View"
        />
        <StatCard
          label="Volunteer Organizations"
          value={volunteerOrganizations}
          link="/dashboard/manage/volunteers"
          linkLabel="View"
        />
        <StatCard
          label="Beneficiaries"
          value={beneficiaries}
          link="/dashboard/manage/beneficiaries"
          linkLabel="View"
        />
        <StatCard
          label="Total Individuals"
          value={individuals}
          link="/dashboard/manage/individuals"
          linkLabel="View"
        />
        <StatCard
          label="Events"
          value={events}
          link="/dashboard/manage/events"
          linkLabel="View"
        />
        <StatCard
          label="Resources"
          value={resources}
          link="/dashboard/manage/resources"
          linkLabel="View"
        />
        <StatCard
          label="Categories"
          value={categories}
          link="/dashboard/manage/categories"
          linkLabel="View"
        />
      </div>

    </>
  );
};

SuperAdminStats.propTypes = {
  data: PropTypes.object.isRequired,
};

export default SuperAdminStats;
