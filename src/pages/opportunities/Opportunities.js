import React from 'react';
import Sidebar from 'components/layouts/Sidebars/Common';
import SearchBar from 'components/SearchBar';
import OrganizationPreview from 'components/common/posts/OrganizationPreview';
import Body from 'components/layouts/Body';

const Opportunities = () => (
  <Body
    sidebar={<Sidebar />}
    title="Opportunities"
  >
    <SearchBar />
    {/* <EventPreview /> */}
    <div className="row organizations-list">
      <OrganizationPreview />
      <OrganizationPreview />
      <OrganizationPreview />
      <OrganizationPreview />
    </div>
  </Body>
);

export default Opportunities;
