/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import CommonContainer from 'components/layouts/Containers/CommonContainer';
import EventSuggestion from 'components/common/posts/EventSuggestion';
import API from 'utils/API';
import YourCategories from './YourCategories';

const Sidebar = () => {
  const [categories, setCategories] = useState([]);

  const _fetchData = async () => {
    try {
      const res = await API.get('/events/suggestions');
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    _fetchData();
  }, []);

  const suggestionList = categories.map((category) => (
    <EventSuggestion key={category.id} data={category} />
  ));

  return (
    <div className="col-lg-3 sidebar p-1">
      <CommonContainer
        title="+ Create Event"
        color="red"
        link="/events/create"
      />
      <YourCategories />
      {suggestionList}
    </div>
  );
};

export default Sidebar;
