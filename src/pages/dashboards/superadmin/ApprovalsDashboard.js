import React, { useEffect, useState } from 'react';
import Sidebar from 'components/layouts/Sidebars/UserProfile';
import Body from 'components/layouts/Body';
import ApprovalsTable from 'components/scenes/dashboards/superadmin/ApprovalsDashboard/ApprovalsTable';
import API from 'utils/API';
import Modal from 'components/common/modal';

const ApprovalsDashboard = () => {
  const [loading, setloading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [data, setData] = useState([]);

  const _openModal = (val) => {
    setSelectedItem(val.original.id);
  };

  const _closeModal = () => {
    setSelectedItem(null);
  };

  const toggleApprovalStatus = async () => {
    setloading(true);
    try {
      const res = await API.put(`organizations/profile/${selectedItem}/toggle-activation-status`);
      setData(res.data);
      setSelectedItem(null);
      setloading(false);
    } catch (err) {
      console.log(err);
      setloading(false);
    }
  };

  const viewOrganization = (val) => {
    console.log('viewOrganization', val);
  };

  const _fetchData = async () => {
    try {
      const res = await API.get('/dashboards/approvals');
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    _fetchData();
  }, []);

  return (
    <>
      <Body
        title="Approvals"
        sidebar={<Sidebar />}
      >
        <ApprovalsTable
          organizations={data}
          viewOrganization={viewOrganization}
          toggleApprovalStatus={_openModal}
        />
      </Body>
      <Modal
        open={!!selectedItem}
        title="Alert!"
        loading={loading}
        description="Are you sure you want approve this organization?"
        closeModal={_closeModal}
        buttonText="Approve"
        buttonFunction={toggleApprovalStatus}
      />
    </>
  );
};

export default ApprovalsDashboard;
