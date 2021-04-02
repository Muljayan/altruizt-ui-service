import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const OrganizationPreview = (props) => {
  const { data } = props;
  const { name, id, categories } = data;
  console.log({ categories });
  const categoriesList = categories.map((category) => (
    <div className="tag" key={category.id}>
      <Link
        to="#"
      >
        {category.name}
      </Link>
    </div>
  ));
  return (
    <div className="organizations-preview col-md-4">
      <div className="post-preview card mt-2 p-2">
        <div className="content">
          <div className="logo">
            <img src="/dummy-icons/volunteer-organization.png" alt="volunteer-organization" />
          </div>
          <h3>{name}</h3>
          <div className="categories">
            {categoriesList}
          </div>
          <div className="stats mb-1">
            <div className="stat">
              <b>5</b>
              {' '}
              Opportunities
            </div>
          </div>
          <div className="btn-container">
            <Link
              to={`/opportunities/profile/${id}`}
              className="btn btn-primary"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

OrganizationPreview.propTypes = {
  data: PropTypes.object.isRequired,
};

export default OrganizationPreview;
