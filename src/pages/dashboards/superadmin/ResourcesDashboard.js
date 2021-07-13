import React, { useEffect, useState } from 'react';
import Sidebar from 'components/layouts/Sidebars/UserProfile';
import Body from 'components/layouts/Body';
import API from 'utils/API';
import ResourcesTable from 'components/scenes/dashboards/superadmin/ResourcesTable';
import ResourcesForm from 'components/scenes/dashboards/superadmin/ResourcesForm';

const ResourcesDashboard = () => {
  const [data, setData] = useState([]);

  const _fetchData = async () => {
    try {
      const res = await API.get('/dashboards/resources');
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    _fetchData();
  }, []);

  return (
    <Body
      title="Resources"
      sidebar={<Sidebar />}
    >
      <ResourcesForm />
      <ResourcesTable
        resources={data}
      />
    </Body>
  );
};

export default ResourcesDashboard;
