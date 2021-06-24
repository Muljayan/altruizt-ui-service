import CommonContainer from 'components/layouts/Containers/CommonContainer';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const YourCategories = (props) => {
  const { data } = props;
  const categoriesList = data.map((category) => (
    <div className="tag" key={category.id}>
      <Link
        to="#"
      >
        {category.name}
      </Link>
    </div>
  ));

  return (
    <CommonContainer
      title="Your Categories"
    >
      <div className="categories">
        {categoriesList}
      </div>
      <div className="btn-container center">
        <Link className="btn btn-primary" to="/profile">
          Edit Categories
        </Link>
      </div>
    </CommonContainer>
  );
};

YourCategories.propTypes = {
  data: PropTypes.array.isRequired,
};

export default YourCategories;
