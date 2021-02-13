import React, { useState } from 'react';
import PropTypes from 'prop-types';

const EventSidebar = (props) => {
  const { data } = props;
  const [pledged, setPledged] = useState(data.eventPledged);
  const [followed, setFollowed] = useState(data.eventFollowed);
  const {
    contactName, phone, location, bankName,
    bankNumber, bankBranch, startDate, endDate,
    eventFollowed, eventPledged,
  } = data;
  console.log(data);

  const _pledge = () => {
    console.log('pledge');
    setPledged(!pledged);
  };

  const _follow = () => {
    console.log('follow');
    setFollowed(!followed);
  };

  return (
    <div className="col-lg-3 sidebar p-1">
      <div className="button-container">
        <button onClick={_pledge} type="button" className={`btn btn-${pledged ? 'primary' : 'red'} mx-1 bold`}>{pledged ? 'Unpledge' : 'Pledge'}</button>
        <button onClick={_follow} type="button" className={`btn btn-${followed ? 'primary' : 'red'} mx-1 bold`}>{followed ? 'Unfollow' : 'Follow'}</button>
      </div>
      <div className="post-preview card mt-2 p-2 mb-2">
        <div className="content">
          <div className="headings">Main Contact Person</div>
          <p>{contactName}</p>
          <div className="headings">Contact Number</div>
          <p>{phone}</p>
          <div className="headings">Event Location</div>
          <p>{location}</p>
          <div className="headings">Bank Account</div>
          <p>
            {bankNumber}
            <br />
            {bankName}
            <br />
            {bankBranch}
          </p>
          <div className="headings">Start Date</div>
          <p>{startDate}</p>
          <div className="headings">End Date</div>
          <p>{endDate}</p>
        </div>
      </div>
    </div>
  );
};

EventSidebar.propTypes = {
  data: PropTypes.object,
};

export default EventSidebar;
