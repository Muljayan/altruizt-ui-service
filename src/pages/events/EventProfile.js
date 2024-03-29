import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { useHistory, useParams } from 'react-router-dom';
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
import InPageNotifier from 'components/common/notifiers/InPageNotifier';
import useNotificationDispatcher from 'hooks/useNotificationDispatch';
import { isPhoneNumber } from 'class-validator';

const getUserEmail = createSelector(
  (state) => state.auth,
  (auth) => auth.user?.email || '',
);

const EventProfile = () => {
  const dispatchNotification = useNotificationDispatcher();
  const userEmail = useSelector(getUserEmail);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [pledged, setPledged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState(userEmail);
  const [phone, setPhone] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const history = useHistory();
  const _goBack = () => {
    history.goBack();
  };
  const _goHome = () => {
    history.push('/');
  };

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
    if (phone && phone.length < 10 && !isPhoneNumber(phone)) {
      dispatchNotification({
        title: 'Alert',
        message: 'Phone number is invalid',
      });
      return;
    }
    try {
      const pledgeBody = { email, phone };
      await API.put(`/events/profile/${data.id}/pledge`, pledgeBody);
      setPledged(!pledged);
      _closeModal();
    } catch (err) {
      console.log(err);
    }
  };

  const _openModal = () => {
    setOpenModal(true);
  };

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

  return (
    <>
      <Body
        sidebar={
          <EventSidebar data={data} pledged={pledged} togglePledge={_openModal} />
        }
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
        textPlaceholder="Your email*"
        textRequired
        textType="email"
        textType2="text"
        text={!pledged ? email : null}
        onTextChange={!pledged ? setEmail : null}
        textPlaceholder2="Your contact number"
        text2={!pledged ? phone : null}
        onTextChange2={!pledged ? setPhone : null}
      />
    </>
  );
};

export default EventProfile;
