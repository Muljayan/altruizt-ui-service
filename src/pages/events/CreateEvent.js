import React, { useState } from 'react';
import Body from 'components/layouts/Body';
import CreationForm from 'components/scenes/events/CreateEvent/CreationForm';
import InPageNotifier from 'components/common/notifiers/InPageNotifier';
import { useHistory } from 'react-router-dom';

const CreateEvent = () => {
  const history = useHistory();
  const [createdEventId, setCreatedEventId] = useState(null);

  const _addNewEvent = () => {
    setCreatedEventId(null);
  };

  const _viewEvent = () => {
    history.push(`/events/profile/${createdEventId}`);
    console.log('_viewEvent');
  };

  const _creationSuccess = (id) => {
    setCreatedEventId(id);
  };

  return (
    <Body
      title={createdEventId ? null : 'Create Event'}
    >
      {
        createdEventId
          ? (
            <InPageNotifier
              header="Congratulations!"
              title1={`Your event is created with id ${createdEventId}`}
              buttonLabel1="View Event"
              buttonFunction1={_viewEvent}
              buttonLabel2="Create Event"
              buttonFunction2={_addNewEvent}
            />
          )
          : (
            <CreationForm
              creationSuccess={_creationSuccess}
            />
          )
      }
    </Body>
  );
};

export default CreateEvent;
