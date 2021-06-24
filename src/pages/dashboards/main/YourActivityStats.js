import React from 'react';
import PropTypes from 'prop-types';

import CommonContainer from 'components/layouts/Containers/CommonContainer';
import StatCard from 'components/common/cards/StatCard';

const YourActivityStats = (props) => {
  const { data } = props;

  return (
    <>
      <CommonContainer
        title="Your Activities"
      />
      <div className="row">
        <StatCard
          label="Events Followed"
          value={data.eventsFollowed}
          link="/followings"
          linkLabel="View"
        />
        <StatCard
          label="Events Pledged"
          value={data.eventsPledged}
        />
      </div>
    </>
  );
};

YourActivityStats.propTypes = {
  data: PropTypes.object.isRequired,
};

export default YourActivityStats;
