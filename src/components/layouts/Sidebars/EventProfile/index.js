// post-preview card mt-2 p-2 mb-2
import React from 'react';
import CommonContainer from 'components/layouts/Containers/CommonContainer';

const EventSidebar = () => (
  <div className="col-lg-3 sidebar p-1">
    {/* Show only if creator */}
    {/* <CommonContainer
      title="+ Edit Event"
      color="red"
      link="/events/create"
    /> */}
    <div className="button-container" style={{ display: 'flex', flexDirection: 'row' }}>
      <button style={{ flex: 1 }} className="btn btn-red mx-1 bold">Pledge</button>
      <button style={{ flex: 1 }} className="btn btn-red mx-1 bold">Follow</button>
    </div>
    <div className="post-preview card mt-2 p-2 mb-2">
      <div className="content">
        <div className="headings">Main Contact Person</div>
        <p>x</p>
        <div className="headings">Contact Number</div>
        <p>+94 11 123 4567</p>
        <div className="headings">Event Location</div>
        <p>+94 11 123 4567</p>
        <div className="headings">Bank Account</div>
        <p>
          bank number
          <br />
          bank className
          <br />
          bank branch
        </p>
        <div className="headings">Start Date</div>
        <p>+94 11 123 4567</p>
        <div className="headings">End Date</div>
        <p>+94 11 123 4567</p>
        {/* .categories come here */}
      </div>
    </div>
  </div>
);

export default EventSidebar;
