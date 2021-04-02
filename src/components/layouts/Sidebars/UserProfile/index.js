import React from 'react';
import CommonContainer from 'components/layouts/Containers/CommonContainer';
import Link from './Link';

const UserProfileSidebar = () => (
  <div className="col-lg-3 sidebar p-1">
    <CommonContainer>
      <div className="profile-nav">
        <b>Profile</b>
        <ul>
          <Link
            name="View Profile"
            link="/profile"
          />
          <Link
            name="Log Out"
            link="/"
          />
        </ul>

        <b>Events</b>
        <ul>
          <Link
            name="Events"
            link="/dashboard/events"
          />
          <Link
            name="Pledges"
            link="/dashboard/pledges"
          />
        </ul>

        <b>Super Admin</b>
        <ul>
          <Link
            name="Approvals"
            link="/dashboard/superadmin/approvals"
          />
          <Link
            name="Individuals"
            link="/dashboard/superadmin/individuals"
          />
          <Link
            name="Corporates"
            link="/dashboard/superadmin/corporates"
          />
          <Link
            name="Volunteer Organizations"
            link="/dashboard/superadmin/volunteers"
          />
          <Link
            name="Beneficiaries"
            link="/dashboard/superadmin/beneficiaries"
          />
          <Link
            name="Events"
            link="/dashboard/superadmin/events"
          />
        </ul>
      </div>
    </CommonContainer>
  </div>
);

export default UserProfileSidebar;
