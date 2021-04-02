import React, { useEffect, useState } from 'react';
import Sidebar from 'components/layouts/Sidebars/UserProfile';
import Body from 'components/layouts/Body';
import IndividualsTable from 'components/scenes/dashboards/superadmin/IndividualsTable';
import API from 'utils/API';

const IndividualsDashboard = () => {
  const [data, setData] = useState([]);

  const _fetchData = async () => {
    try {
      const res = await API.get('/dashboards/individuals');
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
      title="Individuals"
      sidebar={<Sidebar />}
    >
      <IndividualsTable
        individuals={data}
      />
    </Body>
  );
};

export default IndividualsDashboard;
