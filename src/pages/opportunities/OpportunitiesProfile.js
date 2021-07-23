import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Sidebar from 'components/layouts/Sidebars/OrganizationProfile';
import Body from 'components/layouts/Body';
import ResourceCard from 'components/common/cards/ResourceCard';
import DescriptionCard from 'components/common/cards/DescriptionCard';
import StatCard from 'components/common/cards/StatCard';
import EventPreview from 'components/common/posts/EventPreview';
import API from 'utils/API';
import * as linkGenerators from 'utils/linkGenerators';
import InPageNotifier from 'components/common/notifiers/InPageNotifier';

const OpportunitiesProfile = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    name: '',
    image: '',
    address: '',
    phone: '',
    website: '',
    description: '',
    resources: [],
    pastEvents: [],
    currentEvents: [],
    isActive: false,
  });
  const history = useHistory();
  const _goBack = () => {
    history.goBack();
  };
  const _goHome = () => {
    history.push('/');
  };

  const _fetchData = async () => {
    try {
      const res = await API.get(`/organizations/profile/${id}`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    _fetchData();
  }, []);

  const sidebarData = {
    id,
    name: data.name,
    address: data.address,
    phone: data.phone,
    website: data.website,
    organizationFollowed: data.organizationFollowed,
    downvoted: data.downvoted,
    upvoted: data.upvoted,
  };

  console.log({ x: data.isActive });
  if (data && !data.isActive) {
    return (
      <InPageNotifier
        icon="alert"
        header="Warning!"
        title1="This event is deactivated"
        buttonLabel1="Go Home"
        buttonFunction1={_goHome}
        buttonLabel2="Go Back"
        buttonFunction2={_goBack}
      />
    );
  }

  const currentEventsList = data.currentEvents.map((event) => (
    <EventPreview key={event.id} data={event} />
  ));
  const pastEventsList = data.pastEvents.map((event) => (
    <EventPreview key={event.id} data={event} />
  ));
  return (
    <Body
      sidebar={<Sidebar data={sidebarData} />}
      title={data.name}
      image={linkGenerators.userImage(data.image)}
    >
      <DescriptionCard description={data.description} />
      <ResourceCard
        title="Resources Needed"
        resources={data.resources}
      />
      <div className="row">
        <StatCard
          label="Events Completed"
          value={data.pastEvents.length}
        />
        <StatCard
          label="Current Events"
          value={data.currentEvents.length}
        />
        <StatCard
          label="Resources Required"
          value={data.resources.length}
        />
      </div>

      <h2 className="mb-2 mt-1">Current Events</h2>
      <div className="row">
        {
          (currentEventsList && currentEventsList.length) > 0
            ? currentEventsList
            : <>This no events available</>
        }
      </div>

      <h2 className="mb-2 mt-4">Past Events</h2>
      <div className="row">
        {
          (pastEventsList && pastEventsList.length) > 0
            ? pastEventsList
            : <>This no events available</>
        }
      </div>
    </Body>
  );
};

export default OpportunitiesProfile;
