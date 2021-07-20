import React, { useState } from 'react';
import PropTypes from 'prop-types';
import API from 'utils/API';

import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
import CommonContainer from 'components/layouts/Containers/CommonContainer';

const getAuthStatus = createSelector(
  (state) => state.auth,
  (auth) => auth,
);

const EventSidebar = (props) => {
  const { data, pledged, togglePledge } = props;
  const {
    // organizers,
    mainOrganizer,
  } = data;
  const auth = useSelector(getAuthStatus);
  const { isAuthenticated, organization } = auth;
  const isOrganizer = (organization && organization.id && organization.id === mainOrganizer.id);

  const {
    contactName, phone, location, bankName,
    bankNumber, bankBranch, startDate, endDate,
    upvoted: uv, downvoted: dv,
    // eventFollowed, eventPledged,
  } = data;

  const [followed, setFollowed] = useState(data.eventFollowed);
  const [upvoted, setUpvoted] = useState(uv);
  const [downvoted, setDownvoted] = useState(dv);

  const _follow = async () => {
    try {
      await API.put(`/events/profile/${data.id}/follow`);
      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };

  const _upvote = async () => {
    try {
      await API.put(`/events/profile/${data.id}/upvote`);
      setUpvoted(!upvoted);
      setDownvoted(false);
    } catch (err) {
      console.log(err);
    }
  };
  const _downvote = async () => {
    try {
      await API.put(`/events/profile/${data.id}/downvote`);
      setDownvoted(!downvoted);
      setUpvoted(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="col-lg-3 sidebar p-1">
      {
        (isOrganizer && (!data.isComplete))
        && (
          <CommonContainer
            title="✏️ Update"
            color="primary"
            link={`/events/profile/${data.id}/update`}
          />
        )
      }
      {
        data.isComplete
          ? (
            <CommonContainer
              title="⭐ Event Completed!"
              color="dark"
              link="#"
            />
          )
          : (<></>)
      }
      {
        isOrganizer
        && (
          <CommonContainer
            title="🤝 View Pledges"
            color="light-green"
            link={`/events/profile/${data.id}/pledges`}
          />
        )
      }

      {
        isAuthenticated
        && (
          <>
            <div className="button-container">
              <button onClick={togglePledge} type="button" className={`btn btn-${pledged ? 'primary' : 'red'} mx-1 bold`}>{pledged ? 'Pledged' : 'Pledge'}</button>
              <button onClick={_follow} type="button" className={`btn btn-${followed ? 'primary' : 'red'} mx-1 bold`}>{followed ? 'Followed' : 'Follow'}</button>
            </div>
            <div className="button-container my-1">
              <button onClick={_upvote} type="button" className={`btn btn-outline-${upvoted ? 'primary' : 'red'} mx-1 bold`}>Upvote 👍</button>
              <button onClick={_downvote} type="button" className={`btn btn-outline-${downvoted ? 'primary' : 'red'} mx-1 bold`}>{downvoted ? 'Flagged 🚩' : 'Flag 🚩'}</button>
            </div>
          </>
        )
      }
      <div className="post-preview card mt-2 p-2 mb-2">
        <div className="content">
          <div className="headings">Main Contact Person</div>
          <p>{contactName}</p>
          <div className="headings">Contact Number</div>
          <p>{phone}</p>
          <div className="headings">Event Location</div>
          <p>{location}</p>
          {
            bankNumber
            && (
              <>
                <div className="headings">Bank Account</div>
                <p>
                  {bankNumber}
                  <br />
                  {bankName}
                  <br />
                  {bankBranch}
                </p>
              </>
            )
          }
          <div className="headings">Start Date</div>
          <p>{new Date(startDate).toLocaleDateString()}</p>
          <div className="headings">End Date</div>
          <p>{new Date(endDate).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

EventSidebar.propTypes = {
  data: PropTypes.object.isRequired,
  pledged: PropTypes.bool.isRequired,
  togglePledge: PropTypes.func.isRequired,
};

export default EventSidebar;
