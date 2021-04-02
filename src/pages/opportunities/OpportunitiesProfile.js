import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from 'components/layouts/Sidebars/OrganizationProfile';
import Body from 'components/layouts/Body';
import ResourceCard from 'components/common/cards/ResourceCard';
import DescriptionCard from 'components/common/cards/DescriptionCard';
import StatCard from 'components/common/cards/StatCard';
import EventPreview from 'components/common/posts/EventPreview';
import API from 'utils/API';

const OpportunitiesProfile = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');
  const [resources, setResources] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [currentEvents, setCurrentEvents] = useState([]);

  const _fetchData = async () => {
    try {
      const res = await API.get(`/organizations/profile/${id}`);
      setTitle(res.data.name);
      setAddress(res.data.address);
      setPhone(res.data.phone);
      setWebsite(res.data.website);
      setDescription(res.data.description);
      setResources(res.data.resources);
      setCurrentEvents(res.data.currentEvents);
      setPastEvents(res.data.pastEvents);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    _fetchData();
  }, []);

  const sidebarData = {
    name: title,
    address,
    phone,
    website,
  };

  const currentEventsList = currentEvents.map((event) => (
    <EventPreview key={event.id} data={event} />
  ));
  const pastEventsList = pastEvents.map((event) => (
    <EventPreview key={event.id} data={event} />
  ));

  return (
    <Body
      sidebar={<Sidebar data={sidebarData} />}
      title={title}
    >
      <DescriptionCard description={description} />
      <ResourceCard
        title="Resources Needed"
        resources={resources}
      />
      <div className="row">
        <StatCard
          label="Events Completed"
          value={pastEvents.length}
        />
        <StatCard
          label="Current Events"
          value={currentEvents.length}
        />
        <StatCard
          label="Resources Required"
          value={resources.length}
        />
      </div>

      <h2 className="mb-2 mt-1">Current Events</h2>
      <div className="row">
        {currentEventsList}
      </div>

      <h2 className="mb-2 mt-4">Past Events</h2>
      <div className="row">
        {pastEventsList}
      </div>
    </Body>
  );
};

export default OpportunitiesProfile;
