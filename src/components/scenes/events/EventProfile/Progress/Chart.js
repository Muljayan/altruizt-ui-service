import React from 'react';
import PropTypes from 'prop-types';
import ApexChart from 'react-apexcharts';

const Chart = (props) => {
  const { label, value } = props;
  const options = {
    chart: {
      height: 350,
      type: 'radialBar',
    },
    fill: {
      colors: ['#31b584'],
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '50%',
        },
      },
    },
    labels: [label],
  };

  const series = [value];
  return (
    <div className="col-md-4">
      <ApexChart
        options={options}
        series={series}
        type="radialBar"
        height={350}
      />
    </div>
  );
};

Chart.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Chart;
