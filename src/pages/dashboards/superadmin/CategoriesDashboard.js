import React, { useEffect, useState } from 'react';
import Sidebar from 'components/layouts/Sidebars/UserProfile';
import Body from 'components/layouts/Body';
import CategoriesTable from 'components/scenes/dashboards/superadmin/CategoriesTable';
import API from 'utils/API';
import CategoriesForm from 'components/scenes/dashboards/superadmin/CategoriesForm';

const CategoriesDashboard = () => {
  const [data, setData] = useState([]);

  const _fetchData = async () => {
    try {
      const res = await API.get('/dashboards/categories');
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
      title="Categories"
      sidebar={<Sidebar />}
    >
      <CategoriesForm
        setData={setData}
      />
      <CategoriesTable
        categories={data}
      />
    </Body>
  );
};

export default CategoriesDashboard;
