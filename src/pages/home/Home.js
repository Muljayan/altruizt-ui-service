import React from 'react';
import Sidebar from 'components/layouts/Sidebars/Common';
import SearchBar from 'components/SearchBar';
import EventPreview from 'components/common/posts/EventPreview';
import Body from 'components/layouts/Body';

const Home = () => (
  <Body
    sidebar={<Sidebar />}
    title="Home"
  >
    <SearchBar />
    <EventPreview />
    <EventPreview />
    <EventPreview />
  </Body>
);

export default Home;
