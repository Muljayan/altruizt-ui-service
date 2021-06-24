import React, { useEffect, useState } from 'react';
import Body from 'components/layouts/Body';
import StatCard from 'components/common/cards/StatCard';
import SuperAdminStats from './SuperAdminStats';
import YourActivityStats from './YourActivityStats';
import OrganizationStats from './OrganizationStats';
import API from '../../../utils/API';

const MainDashboard = () => {
  const [data, setData] = useState({
    superAdmin: null,
    yourActivities: null,
    yourOrganization: null,
  });

  const _fetchData = async () => {
    try {
      const res = await API.get('/dashboards');
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
      title="Dashboard"
    >
      <div className="row">

        <StatCard
          label="Your Profile"
          // value="2000"
          link="/profile"
          linkLabel="View"
        />

      </div>
      {data.superAdmin && <SuperAdminStats data={data.superAdmin} />}
      {data.yourActivities && <YourActivityStats data={data.yourActivities} />}
      {data.yourOrganization && <OrganizationStats data={data.yourOrganization} />}
    </Body>
  );
};

export default MainDashboard;
