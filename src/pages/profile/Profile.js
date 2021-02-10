import React from 'react';
import Sidebar from 'components/layouts/Sidebars/Common';
import SearchBar from 'components/SearchBar';
import EventPreview from 'components/common/posts/EventPreview';
import Body from 'components/layouts/Body';

const Profile = () => (
  <Body
    sidebar={<Sidebar />}
    title="Profile"
  >
    <SearchBar />
    <EventPreview />
    <EventPreview />
    <EventPreview />
  </Body>
);

export default Profile;
