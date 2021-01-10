import React from 'react';
import PropTypes from 'prop-types';
import CommonContainer from 'components/layouts/Containers/CommonContainer';
import ResourceItem from './ResourceItem';

const Resources = (props) => {
  const { title } = props;
  return (
    <CommonContainer
      title={title}
    >

      <div className="row">
        <ResourceItem
          label="Sugar"
          value="999,999,999"
          units="kg"
        />
        <ResourceItem
          label="Dhal"
          value="999,999,999"
          units="kg"
        />
        <ResourceItem
          label="Rice"
          value="999,999,999"
          units="kg"
        />
        <ResourceItem
          label="PPE Masks"
          value="999,999,999"
        />
        <ResourceItem
          label="Sugar"
          value="999,999,999"
          units="kg"
        />
        <ResourceItem
          label="Dhal"
          value="999,999,999"
          units="kg"
        />
      </div>
    </CommonContainer>
  );
};

Resources.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Resources;
