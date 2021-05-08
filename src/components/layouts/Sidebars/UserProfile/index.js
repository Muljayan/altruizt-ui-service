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
                <b>Reports</b>
                <ul>
                  <Link
                    name="Reports"
                    link="#"
                  />
                </ul>
                <b>Events</b>
                <ul>
                  <Link
                    name="Events"
                    link="/dashboard/manage/events"
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
                    link="/dashboard/manage/approvals"
                  />
                  <Link
                    name="Individuals"
                    link="/dashboard/manage/individuals"
                  />
                  <Link
                    name="Corporates"
                    link="/dashboard/manage/corporates"
                  />
                  <Link
                    name="Volunteer Organizations"
                    link="/dashboard/manage/volunteers"
                  />
                  <Link
                    name="Beneficiaries"
                    link="/dashboard/manage/beneficiaries"
                  />
                  <Link
                    name="Events"
                    link="/dashboard/manage/events"
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
