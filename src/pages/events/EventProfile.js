import React, { useEffect, useState } from 'react';
import Body from 'components/layouts/Body';
import EventSidebar from 'components/layouts/Sidebars/EventProfile';
import ResourceCard from 'components/common/cards/ResourceCard';
import Description from 'components/scenes/events/EventProfile/Description';
import EventProgress from 'components/scenes/events/EventProfile/Progress';
import EventLogs from 'components/scenes/events/EventProfile/Logs';
import API from 'utils/API';
import { useParams } from 'react-router-dom';
import NotFound from 'pages/errors/NotFound';
import Loader from 'components/common/Loader';

const EventProfile = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const _fetchData = async () => {
    try {
      const res = await API.get(`/events/profile/${id}`);
      console.log(res.data);
      setData(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    _fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!loading && !data) {
    return <NotFound />;
  }

  return (
    <Body
      sidebar={<EventSidebar data={data} />}
      title={data.title}
    >
      <Description data={data} />
      <ResourceCard
        title="Resources Needed"
        resources={data.resourcesNeeded}
      />
      <ResourceCard
        title="Resources Obtained"
        resources={data.resourcesReceived}
      />
      <EventProgress
        resources={data.resourcesProgress}
      />
      <EventLogs />
    </Body>
  );
};

export default EventProfile;
