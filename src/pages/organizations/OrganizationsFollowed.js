import React, { useState, useEffect } from 'react';
import Sidebar from 'components/layouts/Sidebars/Common';
import SearchBar from 'components/layouts/SearchBar';
import OrganizationPreview from 'components/common/posts/OrganizationPreview';
import Body from 'components/layouts/Body';
import API from 'utils/API';

const OrganizationsFollowed = () => {
  const [searchString, setSearchString] = useState('');
  const [organizations, setOrganizations] = useState([]);

  const _fetchData = async () => {
    try {
      const data = { searchString };
      const res = await API.post('/organizations/followed', data);
      setOrganizations(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    _fetchData();
  }, [searchString]);

  const organizationList = organizations.map((organization) => (
    <OrganizationPreview key={organization.id} data={organization} />
  ));

  return (
    <Body
      sidebar={<Sidebar />}
      title="Organizations"
    >
      <div className="mx-1">
        <SearchBar
          placeholder="Search Opportunity"
          value={searchString}
          onChange={setSearchString}
        />
      </div>
      <div className="row organizations-list">
        {organizationList}
      </div>
    </Body>
  );
};

export default OrganizationsFollowed;
