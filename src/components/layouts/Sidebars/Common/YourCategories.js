import CommonContainer from 'components/layouts/Containers/CommonContainer';
import React from 'react';

const YourCategories = () => (

  <CommonContainer
    title="Your Categories"
  >
    <div className="btn-container center">
      <a href="/" className="btn btn-primary">
        Edit Categories
      </a>
    </div>
  </CommonContainer>
);

export default YourCategories;
