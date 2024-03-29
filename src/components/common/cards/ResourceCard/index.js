import React from 'react';
import PropTypes from 'prop-types';
import CommonContainer from 'components/layouts/Containers/CommonContainer';
import ResourceItem from './ResourceItem';

const ResourceCard = (props) => {
  const { title, resources } = props;
  const resourceList = resources.map((resource) => (
    <ResourceItem
      key={resource.id}
      label={resource.name}
      value={resource.quantity}
      unit={resource.unit}
    />
  ));
  return (
    <CommonContainer
      title={title}
    >
      <div className="row">
        {resourceList}
      </div>
    </CommonContainer>
  );
};

ResourceCard.propTypes = {
  title: PropTypes.string.isRequired,
  resources: PropTypes.array.isRequired,
};

export default ResourceCard;
