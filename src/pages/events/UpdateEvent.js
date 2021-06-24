import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Body from 'components/layouts/Body';
import UpdateForm from 'components/scenes/events/UpdateEvent/UpdateForm';
import InPageNotifier from 'components/common/notifiers/InPageNotifier';

const UpdateEvent = () => {
  const history = useHistory();
  const { id } = useParams();
  const [updatedEventId, setUpdatedEventId] = useState(null);

  // const _addNewEvent = () => {
  //   setUpdatedEventId(null);
  // };

  const _viewEvent = () => {
    history.push(`/events/profile/${updatedEventId}`);
    console.log('_viewEvent');
  };

  return (
    <Body
      title={updatedEventId ? null : 'Update Event'}
      btnText="Complete Event"
      btnLink={`/events/profile/${id}/complete`}
      btnColor="red"
    >
      {
        updatedEventId
          ? (
            <InPageNotifier
              header="Success!"
              title1="Your event is updated!"
              buttonLabel1="View Event"
              buttonFunction1={_viewEvent}
            // buttonLabel2="Create Event"
            // buttonFunction2={_addNewEvent}
            />
          )
          : (
            <UpdateForm
              updateSuccess={setUpdatedEventId}
            />
          )
      }
    </Body>
  );
};

export default UpdateEvent;
