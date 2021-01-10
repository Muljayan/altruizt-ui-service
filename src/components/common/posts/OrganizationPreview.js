import React from 'react';

const OrganizationPreview = () => (
  <div className="organizations-preview col-md-6">
    <div className="post-preview card mt-2 p-2">
      <div className="content">
        <div className="logo">
          <img src="/dummy-icons/volunteer-organization.png" alt="volunteer-organization" />
        </div>
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
        <div className="stats mb-1">
          <div className="stat">
            <b>5</b>
            {' '}
            Opportunities
          </div>
        </div>
        <div className="btn-container">
          <a href="/" className="btn btn-primary">
            Read More
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default OrganizationPreview;
