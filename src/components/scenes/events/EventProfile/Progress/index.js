import React from 'react';
import PropTypes from 'prop-types';
import CommonContainer from 'components/layouts/Containers/CommonContainer';
import Chart from './Chart';

const EventProgress = (props) => {
  const { resources } = props;

  const progressCharts = resources.map((resource) => {
    const value = Math.round(
      (((resource.receivedQuantity || 0) / resource.neededQuantity) * 100) * 100,
    ) / 100;
    return (
      (
        <Chart
          key={resource.id}
          label={resource.name}
          value={value}
        />
      )
    );
  });

  return (
    <>
      <CommonContainer
        title="Resource Collection Progress"
      />
      <div className="row">
        {progressCharts}
      </div>
    </>
  );
};

EventProgress.propTypes = {
  resources: PropTypes.array.isRequired,
};

export default EventProgress;
