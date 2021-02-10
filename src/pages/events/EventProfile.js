import React from 'react';
import Body from 'components/layouts/Body';
import EventSidebar from 'components/layouts/Sidebars/EventProfile';
import ResourceCard from 'components/common/cards/ResourceCard';
import Description from 'components/scenes/events/EventProfile/Description';
import EventProgress from 'components/scenes/events/EventProfile/Progress';
import EventUpdates from 'components/scenes/events/EventProfile/Updates';

const EventProfile = () => (
  <Body
    sidebar={<EventSidebar />}
    title="Purchase of PPE for first responders of the pandemic"
  >
    <Description />
    <ResourceCard
      title="Resources Available"
    />
    <ResourceCard
      title="Resources Obtained"
    />
    <EventProgress />
    <EventUpdates />
  </Body>
);

export default EventProfile;
