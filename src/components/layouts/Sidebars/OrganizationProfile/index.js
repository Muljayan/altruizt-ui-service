import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CommonContainer from 'components/layouts/Containers/CommonContainer';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
import API from 'utils/API';

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
    id, name, address, phone, website,
    upvoted: uv, downvoted: dv,
  } = data;
  const [followed, setFollowed] = useState(data.organizationFollowed);
  const [upvoted, setUpvoted] = useState(uv);
  const [downvoted, setDownvoted] = useState(dv);

  const _follow = async () => {
    try {
      await API.put(`/organizations/profile/${id}/follow`);
      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };

  const _upvote = async () => {
    try {
      await API.put(`/organizations/profile/${id}/upvote`);
      setUpvoted(!upvoted);
      setDownvoted(false);
    } catch (err) {
      console.log(err);
    }
  };
  const _downvote = async () => {
    try {
      await API.put(`/organizations/profile/${id}/downvote`);
      setDownvoted(!downvoted);
      setUpvoted(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="col-lg-3 sidebar p-1">
      {
        isAuthenticated
        && (
          <>
            <div className="button-container">
              <button onClick={_follow} type="button" className={`btn btn-${followed ? 'primary' : 'red'} mx-1 bold`}>{followed ? 'Followed' : 'Follow'}</button>
            </div>
            <div className="button-container my-1">
              <button onClick={_upvote} type="button" className={`btn btn-outline-${upvoted ? 'primary' : 'red'} mx-1 bold`}>Upvote 👍</button>
              <button onClick={_downvote} type="button" className={`btn btn-outline-${downvoted ? 'primary' : 'red'} mx-1 bold`}>{downvoted ? 'Flagged 🚩' : 'Flag 🚩'}</button>
            </div>
          </>
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
