import CommonContainer from 'components/layouts/Containers/CommonContainer';
import React from 'react';
import { Link } from 'react-router-dom';

const YourCategories = () => (

  <CommonContainer
    title="Your Categories"
  >
    <div className="btn-container center">
      <Link className="btn btn-primary" to="/profile">
        Edit Categories
      </Link>
    </div>
  </CommonContainer>
);

export default YourCategories;
