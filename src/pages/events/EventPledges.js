import React, { useEffect, useState } from 'react';
import Body from 'components/layouts/Body';
import API from 'utils/API';
import { useParams } from 'react-router-dom';

const EventProfile = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const _fetchData = async () => {
    try {
      const res = await API.get(`/events/profile/${id}/pledges`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    _fetchData();
  }, []);
  console.log(data);

  return (
    <Body
      title="Pledges"
    >
      <div className="lol">x</div>
    </Body>
  );
};

export default EventProfile;
