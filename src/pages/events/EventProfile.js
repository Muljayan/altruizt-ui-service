import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { useParams } from 'react-router-dom';
import NotFound from 'pages/errors/NotFound';
import Body from 'components/layouts/Body';
import EventSidebar from 'components/layouts/Sidebars/EventProfile';
import ResourceCard from 'components/common/cards/ResourceCard';
import Description from 'components/scenes/events/EventProfile/Description';
import EventProgress from 'components/scenes/events/EventProfile/Progress';
import EventLogs from 'components/scenes/events/EventProfile/Logs';
import Modal from 'components/common/modal';
import Loader from 'components/common/Loader';
import * as linkGenerators from 'utils/linkGenerators';
import API from 'utils/API';

const getUserEmail = createSelector(
  (state) => state.auth,
  (auth) => auth.user?.email || '',
);

const EventProfile = () => {
  const userEmail = useSelector(getUserEmail);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [pledged, setPledged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contact, setContact] = useState(userEmail);
  const [openModal, setOpenModal] = useState(false);

  const _closeModal = () => {
    setOpenModal(false);
  };

  const _fetchData = async () => {
    try {
      const res = await API.get(`/events/profile/${id}`);
      setData(res.data);
      setLoading(false);
      setPledged(res.data.eventPledged);
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

  const _togglePledge = async () => {
    try {
      await API.put(`/events/profile/${data.id}/pledge`);
      setPledged(!pledged);
      _closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  const _openModal = () => {
    setOpenModal(true);
  };
  return (
    <>
      <Body
        sidebar={<EventSidebar data={data} pledged={pledged} togglePledge={_openModal} />}
        title={data.title}
      >
        {
          data && data.image
          && (
            <div className="row event-image">
              <div className="col-12">
                <img src={linkGenerators.eventImage(data.image)} alt="" />
              </div>
            </div>
          )
        }
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
        <EventLogs logs={data?.logs || []} />
      </Body>
      <Modal
        open={openModal}
        title="Alert!"
        description={!pledged ? 'Are you sure you want to pledge for this event' : 'Revoke pledge'}
        closeModal={_closeModal}
        buttonText={pledged ? 'Unpledge' : 'Pledge'}
        buttonFunction={_togglePledge}
        textPlaceholder="Your email"
        textRequired
        text={!pledged ? contact : null}
        onTextChange={!pledged ? setContact : null}
      />
    </>
  );
};

export default EventProfile;
