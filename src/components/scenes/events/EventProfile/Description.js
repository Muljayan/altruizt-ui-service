import React from 'react';
import PropTypes from 'prop-types';
import OrganizationCard from 'components/common/OrganizationCard';

const Description = (props) => {
  const { data } = props;
  const beneficiariesList = data.beneficiaries.map((beneficiary) => (
    <OrganizationCard key={beneficiary.id} data={beneficiary} />
  ));
  const organizersList = data.organizers.map((organizer) => (
    <OrganizationCard key={organizer.id} data={organizer} />
  ));

  return (
    <div className="post-preview card mt-2 p-2 mb-2">
      <div className="content">
        <div className="headings">Description</div>
        <p>{data.title}</p>
        <div className="headings">Beneficiaries</div>
        <div className="row stats">
          {beneficiariesList}
        </div>
        <div className="headings">Organizations</div>
        <div className="row stats">
          {organizersList}
        </div>
        <div className="progress-bar">
          <div className="bar" />
        </div>
      </div>
    </div>
  );
};

Description.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Description;
