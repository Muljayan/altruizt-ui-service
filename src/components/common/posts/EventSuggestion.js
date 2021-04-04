import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CommonContainer from 'components/layouts/Containers/CommonContainer';
import * as linkGenerators from 'utils/linkGenerators';

const EventSuggestion = (props) => {
  const { data } = props;
  console.log({ data });
  const eventList = data.events.map((event) => (
    <div key={event.id} className="suggestion">
      <Link className="" to={`/events/profile/${event.id}`}>
        <img src={linkGenerators.eventImage(event.image)} alt="" />
        <h6>{event.name}</h6>
      </Link>
    </div>
  ));

  return (
    <CommonContainer
      title={data.name}
      color="brown"
    >
      <div className="event-suggestions">
        {eventList}
      </div>
    </CommonContainer>
  );
};

EventSuggestion.propTypes = {
  data: PropTypes.object.isRequired,
};

export default EventSuggestion;
