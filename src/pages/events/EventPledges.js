import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Body from 'components/layouts/Body';
import Loader from 'components/common/Loader';
import API from 'utils/API';
import PledgesTable from 'components/scenes/events/EventPledges/PledgesTable';
import InPageNotifier from 'components/common/notifiers/InPageNotifier';

const UpdateEvent = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const _goBack = () => {
    history.goBack();
  };
  const _goHome = () => {
    history.push('/');
  };

  const _fetchData = async () => {
    try {
      const res = await API.get(`/events/profile/${id}/pledges`);
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

  // TODO Download as Excel
  // const _download = () => {

  // };

  return (
    <Body
      // btnLink={_download}
      // btnText={(data && data.length > 0) ? 'Download' : ''}
      // btnColor="primary"
      title={(data && data.length > 0) ? 'Event Pledges' : ''}
    >
      {
        data && data.length > 0
          ? (
            <PledgesTable pledges={data} />
          )
          : (
            <InPageNotifier
              icon="error-404"
              header="Page Not Found!"
              title1="The page you're looking for is not found"
              buttonLabel1="Go Back"
              buttonFunction1={_goBack}
              buttonLabel2="Go Home"
              buttonFunction2={_goHome}
            />
          )
      }
    </Body>
  );
};

export default UpdateEvent;
