import React from 'react';
import Sidebar from 'components/layouts/Sidebars/Common';
import SearchBar from 'components/SearchBar';
import EventPreview from 'components/common/posts/EventPreview';
import Body from 'components/layouts/Body';

const Events = () => (
  <Body
    sidebar={<Sidebar />}
    title="Events"
  >
    <SearchBar />
    <EventPreview />
    <EventPreview />
    <EventPreview />
  </Body>
);

export default Events;
