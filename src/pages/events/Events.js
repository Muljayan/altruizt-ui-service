import React, { useState, useEffect } from 'react';
import Sidebar from 'components/layouts/Sidebars/Common';
import SearchBar from 'components/SearchBar';
import EventPreview from 'components/common/posts/EventPreview';
import Body from 'components/layouts/Body';
import DataFetchSelect from 'components/common/input/selectors/DataFetchSelect';
import API from 'utils/API';

const Events = () => {
  const [searchString, setSearchString] = useState('');
  const [resources, setResources] = useState([]);
  const [events, setEvents] = useState([]);

  const _fetchData = async () => {
    try {
      const data = { searchString, resources, personalized: false };
      const res = await API.post('/events', data);
      setEvents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    _fetchData();
  }, [searchString, resources]);

  const eventPreviewList = events.map((event) => (
    <EventPreview key={event.id} data={event} />
  ));

  return (
    <Body
      sidebar={<Sidebar />}
      title="Events"
    >
      <div className="mx-1">
        <SearchBar
          placeholder="Search Event"
          value={searchString}
          onChange={setSearchString}
        />
      </div>
      <DataFetchSelect
        label=""
        colSize={12}
        // type="beneficiaries"
        type="resources"
        placeholder="Search by what you want to donate"
        value={resources}
        onChange={setResources}
        isMulti
      />
      <div className="row">
        {eventPreviewList}
      </div>
    </Body>
  );
};

export default Events;
