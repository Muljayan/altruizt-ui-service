import React from 'react';
// import PropTypes from 'prop-types';
import CommonContainer from 'components/layouts/Containers/CommonContainer';
import Chart from './Chart';

const EventProgress = () => (
  <>
    <CommonContainer
      title="Resource Collection Progress"
    />
    <div className="row">
      <Chart
        value={50}
        label="Rice"
      />
      <Chart
        value={60}
        label="Dhal"
      />
      <Chart
        value={70}
        label="Sugar"
      />
      <Chart
        value={50}
        label="PPE"
      />
    </div>
  </>
);

export default EventProgress;
