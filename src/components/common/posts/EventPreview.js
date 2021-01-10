import React from 'react';

const EventPreview = () => (
  <div className="post-preview card row mt-2 p-2">
    <div className="col-lg-3 image">
      <img src="/dummy-images/opportunity.jpg" alt="" />
    </div>
    <div className="col-lg-9 pl-1 content">
      <h3>Relief for dogs in Animal Shelter</h3>
      <div className="categories">
        <div className="tag">
          <a href="/">animal welfare</a>
        </div>
        <div className="tag">
          <a href="/">animal welfare</a>
        </div>
        <div className="tag">
          <a href="/">animal welfare</a>
        </div>
        <div className="tag">
          <a href="/">animal welfare</a>
        </div>
        <div className="tag">
          <a href="/">animal welfare</a>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="headings">Beneficiaries</div>
          <div className="stats">
            <img src="/dummy-icons/volunteer-organization.png" alt="volunteer-organization" />
            <div className="pl-1 stat">
              <b>+5</b>
              {' '}
              Others
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="headings">Volunteers</div>
          <div className="stats">
            <img src="/dummy-icons/volunteer-organization.png" alt="volunteer-organization" />
            <div className="pl-1 stat">
              <b>+5</b>
              {' '}
              Others
            </div>
          </div>
        </div>
      </div>
      <div className="progress-bar">
        <div className="bar" />
      </div>
      <div className="btn-container">
        <a href="/" className="btn btn-primary">
          Read More
        </a>
      </div>
    </div>
  </div>
);

export default EventPreview;
