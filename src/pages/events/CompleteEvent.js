import React, { useState } from 'react';
import Body from 'components/layouts/Body';
import InPageNotifier from 'components/common/notifiers/InPageNotifier';
import { useHistory } from 'react-router-dom';
import CompleteForm from 'components/scenes/events/CompleteEvent/CompleteForm';

const CompleteEvent = () => {
  const history = useHistory();
  const [completedEventId, setCompletedEventId] = useState(null);

  // const _addNewEvent = () => {
  //   setUpdatedEventId(null);
  // };

  const _viewEvent = () => {
    history.push(`/events/profile/${completedEventId}`);
    console.log('_viewEvent');
  };

  return (
    <Body
      title={completedEventId ? null : 'Complete Event'}
    >
      {
        completedEventId
          ? (
            <InPageNotifier
              header="Success!"
              title1="Your event is completed!"
              buttonLabel1="View Event"
              buttonFunction1={_viewEvent}
            />
          )
          : (
            <CompleteForm
              completeSuccess={setCompletedEventId}
            />
          )
      }
    </Body>
  );
};

export default CompleteEvent;
