import React from 'react';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
import CommonContainer from 'components/layouts/Containers/CommonContainer';
import Link from './Link';

const getAuthStatus = createSelector(
  (state) => state.auth,
  (auth) => auth,
);

const UserProfileSidebar = () => {
  const auth = useSelector(getAuthStatus);
  console.log(auth);
  return (
    <div className="col-lg-3 sidebar p-1">
      <CommonContainer>
        <div className="profile-nav">
          <b>Profile</b>
          <ul>
            <Link
              name="View Profile"
              link="/profile"
            />
          </ul>

          {
            auth.organization
            && (
              <>
                <b>Events</b>
                <ul>
                  <Link
                    name="Events"
                    link="/dashboard/events"
                  />
                </ul>
              </>
            )
          }

          {
            auth.isSuperAdmin
            && (
              <>
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
              </>
            )
          }
        </div>
      </CommonContainer>
    </div>
  );
};

export default UserProfileSidebar;
