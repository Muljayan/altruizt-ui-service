import React, { useEffect, useState } from 'react';
import Sidebar from 'components/layouts/Sidebars/UserProfile';
import Body from 'components/layouts/Body';
import API from 'utils/API';
import Modal from 'components/common/modal';
import EventsTable from './EventsTable';

const EventsDashboard = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [reason, setReason] = useState('');
  const [data, setData] = useState([]);

  const toggleApprovalStatus = async () => {
    try {
      await API.put(`organizations/profile/${selectedItem}/toggle-activation-status`);
      const res = await API.get('/dashboards/organizations');
      setData(res.data);
      setSelectedItem(null);
    } catch (err) {
      console.log(err);
    }
  };

  const _openModal = (val) => {
    setSelectedItem(val.original.id);
  };

  const _closeModal = () => {
    setSelectedItem(null);
    setReason('');
  };

  const viewOrganization = (val) => {
    console.log('viewOrganization', val);
  };

  const _fetchData = async () => {
    try {
      const res = await API.get('/dashboards/events');
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
        title="Events"
        sidebar={<Sidebar />}
      >
        <EventsTable
          events={data}
          viewOrganization={viewOrganization}
          toggleApprovalStatus={_openModal}
        />
      </Body>
      <Modal
        open={selectedItem}
        title="Warning!"
        description="Are you sure you want revoke approval"
        closeModal={_closeModal}
        buttonText="Revoke"
        buttonFunction={toggleApprovalStatus}
        text={reason}
        onTextChange={setReason}
      />
    </>
  );
};

export default EventsDashboard;
