import React, { useState } from 'react';
import Body from 'components/layouts/Body';
import UpdateForm from 'components/scenes/events/UpdateEvent/UpdateForm';
import InPageNotifier from 'components/common/notifiers/InPageNotifier';
import { useHistory } from 'react-router-dom';

const UpdateEvent = () => {
  const history = useHistory();
  const [updatedEventId, setUpdatedEventId] = useState(null);

  const _addNewEvent = () => {
    setUpdatedEventId(null);
  };

  const _viewEvent = () => {
    history.push(`/events/profile/${updatedEventId}`);
    console.log('_viewEvent');
  };

  const _updateSuccess = (id) => {
    setUpdatedEventId(id);
  };

  return (
    <Body
      title={updatedEventId ? null : 'Create Event'}
    >
      {
        updatedEventId
          ? (
            <InPageNotifier
              header="Success!"
              title1="Your event is updated!"
              buttonLabel1="View Event"
              buttonFunction1={_viewEvent}
              buttonLabel2="Create Event"
              buttonFunction2={_addNewEvent}
            />
          )
          : (
            <UpdateForm
              updateSuccess={_updateSuccess}
            />
          )
      }
    </Body>
  );
};

export default UpdateEvent;
