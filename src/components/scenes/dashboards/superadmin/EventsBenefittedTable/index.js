import React, { useEffect, useState } from 'react';
import Sidebar from 'components/layouts/Sidebars/UserProfile';
import Body from 'components/layouts/Body';
import API from 'utils/API';
import Modal from 'components/common/modal';
import EventsTable from './EventsTable';

const EventsBenefittedTable = () => {
  const [selectedItemActiveState, setSelectedItemActiveState] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [reason, setReason] = useState('');
  const [data, setData] = useState([]);

  const toggleApprovalStatus = async () => {
    try {
      await API.put(`events/profile/${selectedItem}/toggle-activation-status`, { reason });
      const res = await API.get('/dashboards/events-benefitted');
      setData(res.data);
      setSelectedItem(null);
    } catch (err) {
      console.log(err);
    }
  };

  const _openModal = (val) => {
    setSelectedItem(val.original.id);
    setSelectedItemActiveState(val.original.isActive);
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
      const res = await API.get('/dashboards/events-benefitted');
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
        open={!!selectedItem}
        title="Alert!"
        description={selectedItemActiveState ? 'Are you sure you want to deactivate this event' : 'Do you want to reactivate this event'}
        closeModal={_closeModal}
        buttonText={selectedItemActiveState ? 'Deactivate' : 'Activate'}
        buttonFunction={toggleApprovalStatus}
        text={selectedItemActiveState ? reason : null}
        onTextChange={selectedItemActiveState ? setReason : null}
      />
    </>
  );
};

export default EventsBenefittedTable;
