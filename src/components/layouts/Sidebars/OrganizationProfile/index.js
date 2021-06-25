import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CommonContainer from 'components/layouts/Containers/CommonContainer';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';

const getAuthStatus = createSelector(
  (state) => state.auth,
  (auth) => auth.isAuthenticated,
);

const OrganizationProfileSidebar = (props) => {
  const {
    data,
  } = props;
  const isAuthenticated = useSelector(getAuthStatus);
  const {
    name, address, phone, website,
  } = data;
  const [followed, setFollowed] = useState(false);

  const _follow = () => {
    console.log('follow');
    setFollowed(!followed);
  };

  return (
    <div className="col-lg-3 sidebar p-1">
      {
        isAuthenticated
        && (
          <div className="button-container mb-2">
            <button onClick={_follow} type="button" className={`btn btn-${followed ? 'primary' : 'red'} mx-1 bold`}>{followed ? 'Unfollow' : 'Follow'}</button>
          </div>
        )
      }

      <CommonContainer
        title="Organization Details"
      >
        <b>Full Name</b>
        <p>{name}</p>
        <b>Address</b>
        <p>{address}</p>
        <b>Phone Number</b>
        <p>{phone}</p>
        <b>Website</b>
        <p><a target="_blank" rel="noreferrer" href={website}>{website}</a></p>
      </CommonContainer>
    </div>
  );
};

OrganizationProfileSidebar.propTypes = {
  data: PropTypes.object.isRequired,
};

export default OrganizationProfileSidebar;
