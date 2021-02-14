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
            link="/"
          />
          <Link
            name="Edit Profile"
            link="/"
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
            link="/"
          />
          <Link
            name="Pledges"
            link="/"
          />
        </ul>

        <b>Super Admin</b>
        <ul>
          <Link
            name="Individuals"
            link="/"
          />
          <Link
            name="Corporates"
            link="/"
          />
          <Link
            name="Volunteer Organizations"
            link="/"
          />
          <Link
            name="Beneficiaries"
            link="/"
          />
          <Link
            name="Events"
            link="/"
          />
        </ul>
      </div>
    </CommonContainer>
  </div>
);

export default UserProfileSidebar;
