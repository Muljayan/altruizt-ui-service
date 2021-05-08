import React from 'react';
import PropTypes from 'prop-types';
import * as linkGenerators from 'utils/linkGenerators';

const OrganizationCard = (props) => {
  const { data } = props;
  return (
    <div className="col-lg-4 col-6 mb-1">
      <img src={linkGenerators.userImage(data.image)} alt="volunteer-organization" />
      <div className="stat">
        {data.name}
      </div>
    </div>
  );
};

OrganizationCard.propTypes = {
  data: PropTypes.object.isRequired,
};

export default OrganizationCard;
