import React from 'react';
import PropTypes from 'prop-types';

const DescriptionCard = (props) => {
  const { description } = props;
  return (
    <div className="post-preview card mt-2 p-2 mb-2">
      <div className="content">
        <div className="headings">Description</div>
        <p>{description}</p>
      </div>
    </div>
  );
};

DescriptionCard.propTypes = {
  description: PropTypes.string.isRequired,
};

export default DescriptionCard;
