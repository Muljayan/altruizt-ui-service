import React from 'react';
import PropTypes from 'prop-types';
import CommonContainer from 'components/layouts/Containers/CommonContainer';
import OrganizationPreview from 'components/common/posts/OrganizationPreview';

const ResourceSuggestion = (props) => {
  const { title, data } = props;

  const organizationList = data.map((organization) => (
    <OrganizationPreview key={organization.id} data={organization} />
  ));

  return (
    <>
      <CommonContainer
        title={title}
      />
      <div className="row organizations-list">
        {organizationList}
      </div>
    </>
  );
};

ResourceSuggestion.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default ResourceSuggestion;
