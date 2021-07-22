import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import CommonContainer from 'components/layouts/Containers/CommonContainer';
import TextArea from 'components/common/input/TextArea';
import API from 'utils/API';
import Loader from 'components/common/Loader';
import useNotificationDispatcher from 'hooks/useNotificationDispatch';
import InPageNotifier from 'components/common/notifiers/InPageNotifier';
import Select from 'components/common/input/selectors/Select';
import Chart from 'components/common/cards/Chart';
import CompletedResourcesTable from './CompletedResourcesTable';

const CompleteForm = (props) => {
  const dispatchNotification = useNotificationDispatcher();
  const history = useHistory();
  const _goBack = () => {
    history.goBack();
  };
  const _goHome = () => {
    history.push('/');
  };

  const { id } = useParams();

  const { completeSuccess } = props;
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState({
    resources: [],
    remainingResources: [],
    organizers: [],
    progress: 0,
  });
  const [organizers, setOrganizers] = useState(null);
  const [closingNote, setclosingNote] = useState('');
  const [warningChecked, setwarningChecked] = useState(false);

  const toggleCheck = () => {
    setwarningChecked(!warningChecked);
  };

  const _onSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log({ organizers });

      if (!warningChecked) {
        dispatchNotification({
          title: 'Alert',
          message: 'Please acknowledge the warning message!',
        });
        return;
      }

      if (data.remainingResources.length > 0 && !organizers) {
        dispatchNotification({
          title: 'Alert',
          message: 'Add an organizer to transfer resources!',
        });
        return;
      }

      const dataObj = {
        transferToOrganization: organizers.value,
        closingNote,
        progress: data.progress,
        remainingResources: data.remainingResources,
      };
      await API.post(`/events/profile/${id}/complete`, dataObj);
      completeSuccess(id);
    } catch (err) {
      dispatchNotification({
        title: 'Alert',
        message: err?.response?.data?.message,
      });
      console.log(err);
    }
  };

  const _fetchData = async () => {
    try {
      const res = await API.get(`/events/profile/${id}/closure`);
      setData(res.data);
      setLoaded(true);
    } catch (err) {
      console.log(err);
      setLoaded(true);
    }
  };

  useEffect(() => {
    _fetchData();
  }, []);

  if (!loaded) {
    return <Loader />;
  }

  if (data.resources && data.resources.length < 1) {
    return (
      <InPageNotifier
        icon="error-404"
        header="Page Not Found!"
        title1="The page you're looking for is not found"
        buttonLabel1="Go Back"
        buttonFunction1={_goBack}
        buttonLabel2="Go Home"
        buttonFunction2={_goHome}
      />
    );
  }

  return (
    <form onSubmit={_onSubmit}>
      <CommonContainer
        title="Event Progress"
      />
      <Chart
        key="ep"
        label="Event Progress"
        value={data.progress}
      />
      <CommonContainer
        title="Resource Transfer"
      />
      <CompletedResourcesTable resources={data.resources} />
      {
        data.remainingResources.length > 0
        && (
          <div className="row mb-2">
            <Select
              id={id}
              label="Who will manage the remaining resources from hereon"
              options={data.organizers}
              value={organizers}
              onChange={setOrganizers}
            />
          </div>
        )
      }
      <CommonContainer
        title="Closing Notes"
      />
      <TextArea
        id="description"
        placeholder="Do you have any closing notes?"
        label=""
        value={closingNote}
        onChange={setclosingNote}
        required
      />
      <div className="row">
        <div className="col-12">
          <div className="field mx-1">
            <div className="confirmation-check mb-2">
              <input type="checkbox" onChange={toggleCheck} checked={warningChecked} />
              <p>Warning! You will not be able to update your event after this</p>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
      </div>
    </form>
  );
};

CompleteForm.propTypes = {
  completeSuccess: PropTypes.func.isRequired,
};

export default CompleteForm;
