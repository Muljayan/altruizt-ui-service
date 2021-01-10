import React from 'react';
import Sidebar from 'components/layouts/Sidebars/Common';
import Body from 'components/layouts/Body';
import Description from 'components/scenes/events/EventProfile/Description';
import Resources from 'components/scenes/events/EventProfile/Resources';
import EventProgress from 'components/scenes/events/EventProfile/Progress';

const EventProfile = () => (
  <Body
    sidebar={<Sidebar />}
    title="Purchase of PPE for first responders of the pandemic"
  >
    <Description />
    <Resources
      title="Resources Available"
    />
    <Resources
      title="Resources Obtained"
    />
    <EventProgress />
  </Body>
);

export default EventProfile;
