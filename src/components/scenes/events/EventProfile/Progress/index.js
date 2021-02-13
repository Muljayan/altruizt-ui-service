import React from 'react';
import PropTypes from 'prop-types';
import CommonContainer from 'components/layouts/Containers/CommonContainer';
import Chart from './Chart';

const EventProgress = (props) => {
  const { resources } = props;

  const progressCharts = resources.map((resource) => (
    <Chart
      key={resource.id}
      label={resource.name}
      value={(resource.receivedQuantity || 0) / resource.neededQuantity}
    />
  ));

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
