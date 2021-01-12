import React from 'react';
import PropTypes from 'prop-types';
import EventPreview from '../posts/EventPreview';

const EventsCard = (props) => {
  const { title } = props;
  return (
    <div className="mb-2">
      <h2>{title}</h2>
      <EventPreview />
      <EventPreview />
      <EventPreview />
    </div>
  );
};

EventsCard.propTypes = {
  title: PropTypes.string.isRequired,
};

export default EventsCard;
