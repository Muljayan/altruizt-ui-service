import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import * as linkGenerators from 'utils/linkGenerators';

const OrganizationPreview = (props) => {
  const { data } = props;
  const {
    name, id, categories, image,
  } = data;
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
          {
            image
            && (
              <div className="logo">
                <img src={linkGenerators.userImage(image)} alt="volunteer-organization" />
              </div>
            )
          }
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
              to={`/organizations/profile/${id}`}
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
