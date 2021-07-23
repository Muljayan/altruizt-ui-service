import React from 'react';
import PropTypes from 'prop-types';
import CommonContainer from 'components/layouts/Containers/CommonContainer';

const EventLogs = (props) => {
  const { logs } = props;
  console.log({ logs });

  const logsList = logs.map((log) => {
    const date = new Date(log.date);
    return (
      <div key={log.id} className="event-update">
        <b>
          {date.toLocaleDateString()}
        </b>
        <p>{log.entry}</p>
      </div>
    );
  });

  return (
    <CommonContainer
      title="Event Logs"
    >
      {
        logsList.length > 0
          ? logsList
          : (
            <div className="event-update">

              <p>No updates available</p>
            </div>
          )
      }

    </CommonContainer>
  );
};

EventLogs.propTypes = {
  logs: PropTypes.array,
};

EventLogs.defaultProps = {
  logs: [],
};

export default EventLogs;
