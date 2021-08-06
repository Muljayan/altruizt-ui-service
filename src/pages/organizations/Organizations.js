import React, { useState, useEffect } from 'react';
import Sidebar from 'components/layouts/Sidebars/Common';
import SearchBar from 'components/layouts/SearchBar';
import OrganizationPreview from 'components/common/posts/OrganizationPreview';
import Body from 'components/layouts/Body';
import API from 'utils/API';
import DataFetchSelect from 'components/common/input/selectors/DataFetchSelect';

const Organizations = () => {
  const [searchString, setSearchString] = useState('');
  const [organizations, setOrganizations] = useState([]);
  const [resources, setResources] = useState([]);

  const _fetchData = async () => {
    try {
      const data = { searchString, resources, isBeneficiary: false };
      const res = await API.post('/organizations', data);
      setOrganizations(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    _fetchData();
  }, [searchString, resources]);

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
      <DataFetchSelect
        label=""
        colSize={12}
        // type="beneficiaries"
        type="resources"
        placeholder="Search by what youre looking"
        value={resources}
        onChange={setResources}
        isMulti
      />
      <div className="row organizations-list">
        {organizationList}
      </div>
    </Body>
  );
};

export default Organizations;
